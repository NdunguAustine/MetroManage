from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from auth0.utils import is_admin, create_user, is_driver
from django.http import JsonResponse, HttpResponseForbidden, HttpResponse
from django.contrib.auth.decorators import login_required
from .models import DriverConductor
from .generate_hash import Generator
from django.contrib.auth.models import Group
from django.core.paginator import Paginator
from .models import DriverConductor, RouteDetails, BusDetails, PaymentDetails, RouteChangeRequest
from .forms import DriverConductorForm
import json
from . import database
from django.db import IntegrityError
from auth0.views import logout_view
from . import utils

# Create your views here.
def route_view(request, route_id):
    if route_id is None or route_id == "":
        return JsonResponse({"message": "Missing data", "status":400}, status=400)

    if request.method == "GET":
        action = request.GET.get("action", None)

        if action is None:
            return JsonResponse({"message": "I dont know what to do.", "status": 400}, status=400)
        try:
            route = RouteDetails.objects.filter(routeID=route_id).first()

            if route is None:
                return JsonResponse({"message":"Route does not exist", "status": 404}, status=404)
            
            if action == "delete":
                route.delete()
                return JsonResponse({"message":"Success", "status":200}, status=200)
            else:
                return JsonResponse({"message": "Not allowed", "status": 400}, status=400)

        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"message": f"Error: {e}", "status":500}, status=500)
        
    return JsonResponse({"message": "Method not allowed", "status": 410}, status=410)
    
@login_required(login_url='/user/login')
def index(request):
    user = request.user
    try:
        if user.is_authenticated:
            if is_admin(user):
                if request.method == "GET":
                    drivers = DriverConductor.objects.all()
                    buses = BusDetails.objects.all()
                    routes = RouteDetails.objects.all()
                    payments = PaymentDetails.objects.all()
                    return render(request,"main/index.html", {
                        "drivers": drivers.count(), 
                        "buses": buses.count(), 
                        "routes": routes.count(), 
                        "payments": payments.count(),
                        "user": user
                        })  
                return render(request,"main/index.html", {})
            else:
                return HttpResponseForbidden("Not allowed to access this services")
        else:
            return redirect("/user/login")
    except Exception as e:
        print(f"Error: {e}")
        return redirect("/user/login")

@login_required(login_url='/user/login')
def admin_bus_view(request):
    user_admin, res = utils.check_if_admin(request.user)
    if not user_admin:
        return res
    
    try:
        if request.method == "GET":
            buses = []
            for bus in BusDetails.objects.all():
                buses.append({
                    "fleet_number": bus.fleetNumber,
                    "license_plate": bus.numberPlate,
                    "route_name": bus.route.routeName if bus.route else "Not assigned",
                    "driver_name": f"{bus.driver.first_name} {bus.driver.last_name}"
                })
            print(f"Buses: {buses}")          
            return render(request,"main/Admin-Bus.html", {"buses":buses})
    except Exception as e:
        print(f"Error: {e}")
        return HttpResponse(f"Error: {e}")

@login_required(login_url='/user/login')
def admin_driver_view(request):
    user = request.user
    user_admin, res = utils.check_if_admin(user)
    if not user_admin:
        return res
    
    if user.is_authenticated:
        if request.method == "GET":
            drivers = DriverConductor.objects.all()

            return render(request,"main/Admin-driver.html", {"drivers": drivers})
        elif request.method == "POST":
            email = request.POST.get("email")
            driverID = request.POST.get("driverID")
            first_name = request.POST.get("first_name")
            last_name = request.POST.get("last_name")
            d_o_b = request.POST.get("date_of_birth")
            gender = request.POST.get("gender")
            phone = request.POST.get("phone")

            if email and driverID and first_name and last_name and d_o_b and gender and phone:
                try:
                    data = {
                        "driverID": driverID,
                        "email": email,
                        "first_name": first_name,
                        "last_name": last_name
                    }
                    is_success, response = create_user(data=data)
                    if is_success:
                        user = response["user"]
                        userID = Generator()
                        driver_conductor = DriverConductor.objects.create(
                            profile= user,
                            first_name=first_name,
                            last_name=last_name,
                            userID = userID,
                            driverID=driverID,
                            gender=gender,
                            date_of_birth=d_o_b,
                            phone=phone,
                            email=email
                        )
                        driver_conductor.save()

                        group_name, created = create_group("user")

                        group_name.user_set.add(user)
                        return JsonResponse({
                            "message": "User added",
                            "status": 200
                        }, status=200)
                    else:
                        return JsonResponse(response, status=response["status"])
                except Exception as e:
                    print(f"Error {e}")
                    return JsonResponse(
                        {
                            "message": f"Error {e}",
                            "status": 500
                        },
                        status=500
                    )
            else:
                return JsonResponse(
                        {
                            "message": "All fields required",
                            "status": 400
                        },
                        status=400
                    )

    else:
        return JsonResponse({
            "message":"Not authorised!",
            "status": 401
        }, status=401)

def create_group(group_name):
    return Group.objects.get_or_create(name=group_name)

@login_required(login_url='/user/login')
def admin_report_view(request):
    user_admin, res = utils.check_if_admin(request.user)
    if not user_admin:
        return res
    return render(request,"main/Admin-Reports.html", {})

@login_required(login_url='/user/login')
def admin_route_view(request):

    user_admin, res = utils.check_if_admin(request.user)
    if not user_admin:
        return res
    
    if request.method == "GET":
        # get all routes
        routes = []

        try:
            list_routes = RouteDetails.objects.all()

            routes = [
                {
                    "route_id": route.routeID,
                    "route_name": route.routeName,
                    "route_start": route.startRoute,
                    "route_destn": route.destination
                } for route in list_routes
            ] if list_routes.exists() else []
                
        except Exception as e:
            print(f"Error: {e}")

        return render(request,"main/Admin-Route.html", {"routes": routes})

    elif request.method == "POST":
        name = request.POST.get("route-name", None)
        start = request.POST.get("route-start", None)
        destination = request.POST.get("route-end", None)

        if start is None or destination is None:
            return JsonResponse({
                "message":"All fields required.",
                "status":400
            }, status=400)
        
        try:
            route_exist = RouteDetails.objects.filter(startRoute=start, destination=destination).exists()
            if route_exist:
                return JsonResponse({
                    "message":"Route already exists.",
                    "status":402
                }, status=402)
            
            new_route = RouteDetails.objects.create(
                routeID=Generator(),
                routeName=name,
                startRoute=start,
                destination=destination
            )
            new_route.save()
            return JsonResponse({
                "message":"Route details added!",
                "status":200,
                "route_id":str(new_route.routeID)
            },status=200)
        except IntegrityError as e:
            return JsonResponse({
                "message":"Route already exists.",
                "status":402
            }, status=402)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({
                "message":f"Error: {e}",
                "status":500
            }, status=500)

@login_required(login_url='/user/login')
def admin_payment_view(request):
    user_admin, res = utils.check_if_admin(request.user)
    if not user_admin:
        return res
    return render(request,"main/AdminPayments.html", {})




@login_required(login_url='/user/login')
def user_activity_view(request):
    user = request.user
    user_is_driver = is_driver(user)
    if not user_is_driver:
        return HttpResponseForbidden("Not allowed to access this services")
    return render(request,"main/User-Activity.html", {})

def user_alerts_view(request):
    return render(request,"main/User-Alerts.html", {})

@login_required(login_url='/user/login')
def user_payments_view(request):
    user = request.user
    user_is_driver = is_driver(user)

    if not user_is_driver:
        return HttpResponseForbidden("Not allowed to access this services")

    payment_balance = 5000
    
    return render(request,"main/User-Payment.html", {"payment_balance":payment_balance})

@login_required(login_url='/user/login')
def user_profile_view(request):
    user = request.user
    user_is_driver = is_driver(user)
    if not user_is_driver:
        return HttpResponseForbidden("Not allowed to access this services")
    
    return render(request,"main/User-Profile.html", {})

@login_required(login_url='/user/login')
def user_route_view(request):
    user = request.user
    user_is_driver = is_driver(user)

    if not user_is_driver:
        return HttpResponseForbidden("Not allowed to access this services")
    
    if request.method == "POST":
        try:
            print(f"Data: {request.POST}")
            route = request.POST.get("newRoute", None)
            reason = request.POST.get("reason", None)

            print(f"Data: {route}, {reason}")

            if not all([route, reason]):
                return JsonResponse({
                    "message":"All route fields required.",
                    "status":400
                }, status=400)
            
            driver = DriverConductor.objects.filter(profile=user).first()

            if driver:
                route_change = RouteChangeRequest.objects.create(
                    driver=driver,
                    requested_route=route,
                    reason=reason
                )
                route_change.save()
                return JsonResponse({
                    "message":"Route change request submitted.",
                    "status":200
                }, status=200)
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({
                "message":f"Error: {e}",
                "status":500
            }, status=500)
    else:
        pending_requests = []
        try:
            driver = DriverConductor.objects.filter(profile=user).first()

            if driver:
                route_requests = RouteChangeRequest.objects.filter(driver=driver, status="Pending").all()

                if route_requests.exists():
                    for route_request in route_requests:
                        pending_requests.append({
                            "route": route_request.requested_route,
                            "reason": route_request.reason,
                            "status": route_request.status
                        })

        except Exception as e:
            print(f"Error: {e}")
        print(f"Pending request: {pending_requests}")
        return render(request,"main/User-Route.html", {"pending_requests":pending_requests})

@login_required(login_url='/user/login')
def user_dashboard_view(request):
    user = request.user
    user_is_driver = is_driver(user)
    if user.is_authenticated and user_is_driver:
        try:
            driver_bus = "Not assigned"
            bus_router = "Not assigned"
            driver = DriverConductor.objects.filter(profile=user).first()
            if driver:
                bus = BusDetails.objects.filter(driver=driver).first()
                
                if bus:
                    driver_bus = bus.fleetNumber
                    if bus.route:
                        bus_router = bus.route.routeName
                
            return render(request, "main/User-Dashboard.html", {
                "driver": driver,
                "bus": driver_bus,
                "route": bus_router
            })
        except Exception as e:
            return JsonResponse({
                "message":f"Error: {e}",
                "status":500
            }, status=500)
    else:
        return HttpResponseForbidden("Not allowed to access this services")
        
def user_login_view(request):
    return render(request, "main/login.html", {})

@login_required(login_url='/user/login')
def admin_addDriver_view(request):
    user_admin, res = utils.check_if_admin(request.user)
    if not user_admin:
        return res
    return render(request,"main/Admin-add-driver.html", {})

@login_required(login_url='/user/login')
def admin_addBus_view(request):
    user_admin, res = utils.check_if_admin(request.user)
    if not user_admin:
        return res
    
    if request.method == "GET":
        routes = []
        drivers = []
        for route in RouteDetails.objects.all():
            routes.append({
                "route_id":route.routeID,
                "route_name":route.routeName
            })
        for driver in DriverConductor.objects.all():
            drivers.append({
                "driver_id":driver.driverID,
                "driver_name":f"{driver.first_name} {driver.last_name}"
            })
    
    
        return render(request,"main/Admin-add-bus.html", {"routes":routes, "drivers":drivers})
    
    elif request.method == "POST":

        fleetNumber = request.POST.get("fleetNo", None)
        numberPlate = request.POST.get("licensePlate", None)
        capacity = request.POST.get("capacity", None)
        driver = request.POST.get("driver", None)
        route = request.POST.get("route", None)

        print(f"Data {request.POST}")

        if not all([fleetNumber, numberPlate, capacity, driver, route]):
            return JsonResponse({
                "message":"All fields required.",
                "status":400
            }, status=400)
        
        try:
            driver_conductor = DriverConductor.objects.filter(driverID=driver).first()
            db_route = RouteDetails.objects.filter(routeID=route).first()

            if driver_conductor is None or db_route is None:
                return JsonResponse({
                    "message":"all fields required(driver and route)",
                    "status":400
                },status=400)
            new_bus = BusDetails.objects.create(
                busID=Generator(),
                fleetNumber=fleetNumber,
                numberPlate=numberPlate,
                route=db_route,
                driver=driver_conductor
            )
            new_bus.save()
            return JsonResponse({
                "message":"Bus added",
                "status":200
            }, status=200)
        except IntegrityError as e:
            return JsonResponse({
                "message":"Fleet number or license plate already exists.",
                "status":402
            }, status=402)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({
                "message":f"Error: {e}",
                "status":500
            }, status=500)

    else:
        return JsonResponse({
            "message":"Method not allowed",
            "status":405
        }, status=405)

def user_landing_view(request):
    return render(request,"main/Landing.html", {})

@login_required(login_url='/user/login')
def user_logout_view(request):
    return render(request, "main/logout.html", {})


@login_required(login_url='/user/login')
def user_ConfirmLogout_view(request):
    is_success = logout_view(request)
    if is_success:
        return render(request, "main/landing.html", {})
    else:
        HttpResponse("Something went wrong")

@login_required(login_url='/user/login')
def user_profile_page_view(request):
    user = request.user

    try:
        is_sucess, response = database.get_drive_conductor(user)

        if is_sucess:
            return render(request, "main/User-Profile-Page.html", {"driver": response}, status=200)
        else:
            return HttpResponse(response["message"])
    except Exception as e:
        return HttpResponse(f"Something went wrong: {str(e)}")

@login_required(login_url='/user/login')
def user_edit_profile_view(request):
    user = request.user

    try:
        if request.method != "POST":
            is_sucess, response = database.get_drive_conductor(user)

            if is_sucess:
                return render(request, "main/User-Edit-Profile.html", {"driver": response}, status=200)
            else:
                return HttpResponse(response["message"])
        else:
            email = request.POST.get("email")
            first_name = request.POST.get("first_name")
            last_name = request.POST.get("last_name")
            date_of_birth = request.POST.get("date_of_birth")
            gender = request.POST.get("gender")
            phone = request.POST.get("phone")

            # Check if any field is missing or empty
            if not all([email, first_name, last_name, date_of_birth, gender, phone]):
                print("All fields required!")
                return JsonResponse({
                    "message": "All fields required!",
                    "status": 400
                }, status=400)
            
            is_sucess, response = database.update_driver_conductor({
                "email":email,
                "first_name":first_name,
                "last_name":last_name,
                "date_of_birth":date_of_birth,
                "gender":gender,
                "phone": phone,
                "user": user
            })

            return JsonResponse(response, status=response["status"])
            
            
    except Exception as e:
        print(f"Error: {e}")
        return HttpResponse(f"Something went wrong: {str(e)}")


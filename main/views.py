from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from auth0.utils import is_admin, create_user
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import DriverConductor
from .generate_hash import Generator
from django.contrib.auth.models import Group
from django.core.paginator import Paginator
from .models import DriverConductor, RouteDetails
from .forms import DriverConductorForm

# Create your views here.
def index(request):
    return render(request,"main/index.html", {})

def admin_bus_view(request):
    return render(request,"main/Admin-Bus.html", {})

@login_required(login_url='/user/login')
def admin_driver_view(request):
    user = request.user
    if user.is_authenticated and is_admin(user):
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
 
def admin_report_view(request):
    return render(request,"main/Admin-Reports.html", {})

def admin_route_view(request):
    if request.method == "GET":
        return render(request,"main/Admin-Route.html", {})

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
            new_route = RouteDetails.objects.create(
                routeID=Generator(),
                routeName="Default Name",
                startRoute=start,
                destination=destination
            )
            new_route.save()
            return JsonResponse({
                "message":"Route details added!",
                "status":200
            },status=200)
        
        except Exception as e:
            return JsonResponse({
                "message":f"Error: {e}",
                "status":500
            }, status=500)

def admin_payment_view(request):
    return render(request,"main/AdminPayments.html", {})

def user_activity_view(request):
    return render(request,"main/User-Activity.html", {})

def user_alerts_view(request):
    return render(request,"main/User-Alerts.html", {})

def user_payments_view(request):
    return render(request,"main/User-Payment.html", {})

def user_profile_view(request):
    return render(request,"main/User-Profile.html", {})

def user_route_view(request):
    return render(request,"main/User-Route.html", {})

def user_dashboard_view(request):
    return render(request, "main/User-Dashboard.html", {})

def user_login_view(request):
    return render(request, "main/login.html", {})

def admin_addDriver_view(request):
    return render(request,"main/Admin-add-driver.html")
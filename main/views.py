from django.shortcuts import render
from django.contrib.auth.models import User
from auth0.utils import is_admin
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    return render(request,"main/index.html", {})

def admin_bus_view(request):
    return render(request,"main/Admin-Bus.html", {})

@login_required(login_url='/auth/login')
def admin_driver_view(request):
    user = request.user
    if user.is_authenticated and is_admin(user):
        if request.method == "GET":
            return render(request,"main/Admin-driver.html", {})
        elif request.method == "POST":
            email = request.POST.get("driver-name")
            password = request.POST.get("driver-contact")
            if email and password:
                try:
                    user = User.objects.create_user(
                        username=email,
                        email=email,
                        password=password
                    )
                    return JsonResponse(
                        {
                            "message":"Account created!",
                            "status": 200
                        },
                        status=200
                    )
                except Exception as e:
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
 
def admin_report_view(request):
    return render(request,"main/Admin-Reports.html", {})

def admin_route_view(request):
    return render(request,"main/Admin-Route.html", {})

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
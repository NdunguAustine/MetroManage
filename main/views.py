from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,"main/index.html", {})

def admin_bus_view(request):
    return render(request,"main/Admin-Bus.html", {})

def admin_driver_view(request):
    return render(request,"main/Admin-driver.html", {})
 
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
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
import logging
from .utils import is_driver, is_admin

# Create your views here.


logger = logging.getLogger(__name__)  # Set up logging

def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        role = request.POST.get("role")

        if not all([email, password, role]):
            return JsonResponse({
                "message": "All fields are required. Please fill out the form completely.",
                "status": 400
            }, status=400)

        try:
            user = authenticate(request, username=email, password=password)
            if user:
                login(request, user)
                user_is_driver = is_driver(user)
                user_is_admin = is_admin(user)

                redirect_url  = "/" if user_is_admin else "/user/dashboard"

                return JsonResponse({
                    "message": "Login successful. Redirecting...",
                    "status": 200,
                    "redirect_url": redirect_url
                }, status=200)
            else:
                return JsonResponse({
                    "message": "Invalid credentials. Please check your email and password.",
                    "status": 401
                }, status=401)

        except Exception as e:
            logger.error(f"Login error: {e}")
            return JsonResponse({
                "message": "An internal error occurred. Please try again later.",
                "status": 500
            }, status=500)

    return JsonResponse({
        "message": "Invalid request method. Please use POST.",
        "status": 405
    }, status=405)

def logout_view(request):
    try:
        logout(request)
        return True
    except Exception as e:
        return False
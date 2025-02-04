from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate


# Create your views here.
def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password= request.POST.get("password")
        role = request.POST.get("role")

        if email and password and role:
            try:
                user = authenticate(request=request, username=email, password=password)
                if user:
                    login(request, user)
                    return JsonResponse({
                        "message": "login successfully!",
                        "status": 200
                    }, status=200)
                else:
                    return JsonResponse({
                        "message": "User not found",
                        "status": 401
                    }, status=401)
            except Exception as e:
                print(f"Error {e}")
                return JsonResponse({
                    "message": f"Error occured: {e}",
                    "status": 500
                }, status=500)
        

        else:
            return JsonResponse({
                "message":"All fields required.",
                "status": 405
            }, status=405)
        
    else:
        return JsonResponse({
            "message": "Invalid method.",
            "status": 400
        }, status=400)

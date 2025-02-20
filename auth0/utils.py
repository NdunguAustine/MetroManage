from django.contrib.auth.models import User
def is_admin(user):
    return user.groups.filter(name="admin").exists()

def is_driver(user):
    return user.groups.filter(name="driver").exists()

def create_user(data={}):
    try:
        email = data["email"]
        first_name = data["first_name"]
        last_name = data["last_name"]
        driverID = data["driverID"]
        user = User.objects.create_user(
            username=email,
            email=email,
            password=driverID,
            first_name=first_name,
            last_name =last_name
        )
        return True, {
            "message": "Account created!",
            "status":200,
            "user": user
        }
    except Exception as e:
        print(f"Error: {e}")
        return False, {
            "message": f"Error: {e}",
            "status" : 500
        }
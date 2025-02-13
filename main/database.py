from . models import DriverConductor

def get_drive_conductor(profile=None):
    if profile is None:
        return False, {
            "message": "user not found!",
            "status": 400
        }
    
    try:
        driver_conductor = DriverConductor.objects.filter(profile=profile).first()
        if driver_conductor is None:
            return False, {
                "message":"Driver not found!",
                "status": 400
            }
        
        return True, {
            "driverID": driver_conductor.driverID,
            "email": driver_conductor.email,
            "last_name": driver_conductor.last_name,
            "first_name": driver_conductor.first_name,
            "phone": driver_conductor.phone,
            "gender": driver_conductor.gender,
            "date_of_birth": str(driver_conductor.date_of_birth)
        }
    
    except Exception as e:
        return False, {
            "message": f"Error: {e}",
            "status": 500
        }
    
def update_driver_conductor(driver_info={}):
    try:
        user = driver_info["user"]
        driver_conductor = DriverConductor.objects.filter(profile=user).first()

        if driver_conductor is None:
            return False, {
                "message":f"Error: user does not exist",
                "status": 405
            }
        
        # driver_conductor.first_name = driver_info["first_name"]
        # driver_conductor.last_name = driver_info["last_name"]
        # driver_conductor.email = driver_info["email"]
        # driver_conductor.phone = driver_info["phone"]
        # driver_conductor.gender = driver_info["gender"]
        # driver_conductor.date_of_birth = driver_info["date_of_birth"]

        # driver_conductor.save()
        for key, value in driver_info.items():
            if hasattr(driver_conductor, key):  # Check if the model has the attribute
                setattr(driver_conductor, key, value)

        driver_conductor.save()

        return True, {
            "message": "Information updated!",
            "status": 200
        }
    except Exception as e:
        print(f"ERROR: {e}")
        return False,{
            "message":f"Something went wrong {e}",
            "status": 500
        }
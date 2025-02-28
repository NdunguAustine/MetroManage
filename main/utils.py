from auth0.utils import is_admin
from django.http import HttpResponseForbidden

def check_if_admin(user):
    user_is_admin = is_admin(user)
    if not user_is_admin:
        return False, HttpResponseForbidden("Not allowed to access this services")
    return True, user_is_admin
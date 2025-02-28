from django.contrib import admin
from .models import DriverConductor,RouteDetails, BusDetails, RouteChangeRequest

models = [DriverConductor, RouteDetails, BusDetails, RouteChangeRequest]
admin.site.register(models)

# Register your models here.

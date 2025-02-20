from django.contrib import admin
from .models import DriverConductor,RouteDetails, BusDetails

models = [DriverConductor, RouteDetails, BusDetails]
admin.site.register(models)

# Register your models here.

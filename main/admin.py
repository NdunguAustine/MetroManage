from django.contrib import admin
from .models import DriverConductor, RouteBus,RouteDetails

models = [DriverConductor, RouteDetails,RouteBus]
admin.site.register(models)

# Register your models here.

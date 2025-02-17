from django.contrib import admin
from .models import DriverConductor,RouteDetails

models = [DriverConductor, RouteDetails]
admin.site.register(models)

# Register your models here.

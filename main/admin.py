from django.contrib import admin
from .models import DriverConductor

models = [DriverConductor]
admin.site.register(models)

# Register your models here.

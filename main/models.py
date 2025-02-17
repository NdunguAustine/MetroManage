from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class DriverConductor(models.Model):
    userID = models.CharField(max_length=50,unique=True, blank=False, null=False)
    driverID = models.CharField(max_length=50, unique=True, blank=False, null=False)
    email =  models.CharField(max_length=50, blank=False, null=False)
    first_name = models.CharField(max_length=30, blank=False, null=False)
    last_name = models.CharField(max_length=30, blank=False, null=False)
    date_of_birth = models.DateField(null=False, blank=False)
    gender = models.CharField(max_length=10,null=False, blank=False)
    phone= models.CharField(max_length=20,null=False, blank=False)
    profile = models.ForeignKey(User, null=False, blank=False,on_delete=models.CASCADE, related_name="driver_profile")

    def __str__(self):
        return self.driverID
    
class  BusDetails(models.Model):
    busID= models.CharField(max_length=50, unique=True, blank=False, null=False)
    fleetNumber= models.CharField(max_length=20, blank=False, null=False, unique=True)
    numberPlate= models.CharField(max_length=20, blank=False, null=False, unique=True)
    driver= models.ForeignKey(DriverConductor, on_delete=models.CASCADE, related_name="bus_driver", blank=True, null=True)

    def __str__(self):
        return self.numberPlate
    
class RouteDetails(models.Model):
    routeID= models.CharField(max_length=50, unique=True, blank=False, null= False)
    routeName= models.CharField(max_length=30, blank=False, null=False, unique=True)
    startRoute= models.CharField(max_length=50, blank=False, null=False)
    destination= models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return self.routeName
    
class PaymentDetails(models.Model):
    paymentID= models.CharField(max_length=50, unique=True, blank=False, null=False)
    bus= models.ForeignKey(BusDetails, on_delete=models.CASCADE, related_name="bus_payment", blank=False, null=False)
    amount= models.CharField(max_length=50, blank=False, null=False)
    referenceCode= models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return self.bus.numberPlate
    
class RouteBus(models.Model):
    route= models.ForeignKey(RouteDetails, on_delete=models.CASCADE, related_name="bus_route", blank=False, null=False)
    buses= models.JSONField()

    def __str__(self):
        return self.route.routeName

class RouteChangeRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    driver = models.ForeignKey(DriverConductor, on_delete=models.CASCADE, related_name= "route_change") 
    current_route = models.CharField(max_length=100)
    requested_route = models.CharField(max_length=100)
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.driver.username} - {self.requested_route} ({self.status})"

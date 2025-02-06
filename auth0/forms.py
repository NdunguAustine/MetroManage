from django import forms
from .models import DriverConductor

class DriverConductorForm(forms.ModelForm):
    class Meta:
        model = DriverConductor
        fields = '__all__'

# Generated by Django 5.1.6 on 2025-02-13 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='busdetails',
            name='fleetNumber',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='busdetails',
            name='numberPlate',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='routedetails',
            name='routeName',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]

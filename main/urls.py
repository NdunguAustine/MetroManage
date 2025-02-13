from django.urls import path
from . import views

urlpatterns = [
    path("",  view=views.index, name="homepage"),
    path("admin/bus",  view=views.admin_bus_view, name="admin_bus_view"),
    path("admin/drivers",  view=views.admin_driver_view, name="admin_driver_view"),
    path("admin/reports",  view=views.admin_report_view, name="admin_report_view"),
    path("admin/routes",  view=views.admin_route_view, name="admin_route_view"),
    path("admin/payments",  view=views.admin_payment_view, name="admin_payment_view"),
    path("user/activity",  view=views.user_activity_view, name="user_activity_view"),
    path("user/alerts",  view=views.user_alerts_view, name="user_alerts_view"),
    path("user/payments",  view=views.user_payments_view, name="user_payments_view"),
    path("user/profile",  view=views.user_profile_view, name="user_profile_view"),
    path("user/routes",  view=views.user_route_view, name="user_route_view"),
    path("user/dashboard", view=views.user_dashboard_view, name="user_dashboard_view"),
    path("user/login", view=views.user_login_view, name="user_login_view"),
    path("admin/addDriver", view=views.admin_addDriver_view, name="admin_addDriver_view"),
    path("admin/addBus", view=views.admin_addBus_view, name="admin_addBus_view"),
    path("user/landing", view=views.user_landing_view, name="user_landing_view"),
    path("user/ProfilePage", view=views.user_profile_page_view, name="user_profile_page_view"),
    path("user/EditProfile", view=views.user_edit_profile_view, name="user_edit_profile_view")

]


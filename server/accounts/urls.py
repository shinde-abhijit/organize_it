from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register_user, name="register_user"),
    path("login/", views.login_user, name="login_user"),
    path("logout/", views.logout_user, name="logout_user"),
    path("profile/", views.user_profile, name="user_profile"),
    path("update/", views.update_user, name="update_user"),
    path("delete/", views.delete_user, name="delete_user"),
]

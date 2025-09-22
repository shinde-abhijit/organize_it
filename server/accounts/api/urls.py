from django.urls import path
from .viewset import RegisterView, LoginView, ProfileView, UpdateUserView, LogoutView, DeleteUserView

urlpatterns = [
        path("register/", RegisterView.as_view(), name="api_register"),
        path("login/", LoginView.as_view(), name="api_login"),
        path("profile/", ProfileView.as_view(), name="api_profile"),
        path("update/", UpdateUserView.as_view(), name="api_update_user"),
        path("logout/", LogoutView.as_view(), name="api_logout"),
        path("delete/", DeleteUserView.as_view(), name="api_delete_user"),
]

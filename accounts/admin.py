from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import CustomUser
from .forms import UserRegisterForm, UserUpdateForm


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """Custom admin panel for CustomUser."""

    # Forms for add/change
    add_form = UserRegisterForm
    form = UserUpdateForm
    model = CustomUser

    # What fields to show in list
    list_display = ("email", "username", "first_name", "last_name", "contact", "is_staff", "is_active", "date_joined")
    list_filter = ("is_staff", "is_active", "date_joined")

    # Fieldsets for editing a user
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal Info"), {"fields": ("username", "first_name", "last_name", "contact", "bio", "profile_image")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_("Important Dates"), {"fields": ("last_login", "date_joined")}),
    )

    # Fields for creating a user
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "first_name", "last_name", "contact", "profile_image", "password1", "password2", "is_active", "is_staff"),
        }),
    )

    search_fields = ("email", "username", "first_name", "last_name", "contact")
    ordering = ("-date_joined",)

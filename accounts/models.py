from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)
from django.utils import timezone
from django.core.validators import RegexValidator, EmailValidator
from django.core.exceptions import ValidationError
import re
from accounts.utils import rename_profile_image
from accounts.utils import ext_validator, validate_file_mime_type


def validate_email_domain(value):
    """Allow only Gmail, Outlook, Hotmail, Yahoo, Live email domains."""
    allowed_domains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "live.com"]
    domain = value.split("@")[-1].lower()
    if domain not in allowed_domains:
        raise ValidationError(f"Email domain '{domain}' is not allowed. Use Gmail, Outlook, Hotmail, Yahoo, or Live.")

alphanumeric_validator = RegexValidator(
    regex=r"^[a-zA-Z0-9]+$",
    message="Username must be alphanumeric (letters and numbers only)."
)

name_validator = RegexValidator(
    regex=r"^[a-zA-Z\s.]+$",
    message="Name can only contain letters, spaces, and periods."
)

contact_validator = RegexValidator(
    regex=r"^\d{10,13}$",
    message="Contact must be between 10 and 13 digits."
)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular user with the given email and password."""
        if not email:
            raise ValueError("The Email field must be set")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.full_clean()  
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a superuser with all permissions."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    """Custom User model with email as unique identifier."""
    email = models.EmailField(max_length=255, unique=True, validators=[validate_email_domain],)
    username = models.CharField(max_length=50, unique=True, validators=[alphanumeric_validator],)
    first_name = models.CharField(max_length=50, blank=True, null=True, validators=[name_validator])
    last_name = models.CharField( max_length=50, blank=True, null=True, validators=[name_validator],)
    contact = models.CharField(max_length=13, blank=True, null=True, validators=[contact_validator],)
    bio = models.TextField(blank=True, null=True)
    profile_image = models.FileField(upload_to=rename_profile_image, blank=True, null=True, validators=[ext_validator, validate_file_mime_type])
    is_staff = models.BooleanField(default=False)  
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [ "username", "first_name", "last_name", "contact" ]  

    def delete(self):
        self.profile_image.delete()
        super().delete()

    def __str__(self):
        return f"{self.username} ({self.email})"

    class Meta:
        verbose_name = "Custom user"
        verbose_name_plural = "Custom users"
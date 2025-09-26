from django.db import models
from django.core.exceptions import ValidationError
import re
from accounts.models import CustomUser
from contacts.utils import (
    rename_contact_image, contact_image_ext_validator, 
    CONTACT_CATEGORY 
)

ALLOWED_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com"]

name_pattern = r"^[A-Za-z\s'-]+$"

class Contact(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="contacts")
    first_name = models.CharField(max_length=30, blank=False, db_index=True)
    last_name = models.CharField(max_length=30, blank=False, db_index=True)
    primary_contact = models.CharField(max_length=13, blank=False)
    secondary_contact = models.CharField(max_length=13, blank=False)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=50, blank=True, db_index=True)
    state = models.CharField(max_length=50, blank=True)
    country = models.CharField(max_length=50, blank=True)
    primary_email = models.EmailField()
    secondary_email = models.EmailField()
    image = models.FileField(upload_to=rename_contact_image, validators=[contact_image_ext_validator], blank=True, null=True)
    category = models.CharField(max_length=30, blank=False, default="Other", choices=CONTACT_CATEGORY)

    is_favorite = models.BooleanField(default=False)
    is_emergency_contact = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        name_pattern = r'^[A-Za-z]+$'  # letters only

        # --- Validate first_name and last_name ---
        if self.first_name and not re.match(name_pattern, self.first_name):
            raise ValidationError("First name can contain letters only.")

        if self.last_name and not re.match(name_pattern, self.last_name):
            raise ValidationError("Last name can contain letters only.")

        if self.first_name and self.last_name and self.first_name.lower() == self.last_name.lower():
            raise ValidationError("First and Last name can't be the same.")

        # --- Validate primary and secondary contact numbers ---
        if not re.match(r'^\d{10,13}$', self.primary_contact):
            raise ValidationError("Primary contact must be 10–13 digits.")

        if not re.match(r'^\d{10,13}$', self.secondary_contact):
            raise ValidationError("Secondary contact must be 10–13 digits.")

        # Ensure contacts are not the same
        if self.primary_contact == self.secondary_contact:
            raise ValidationError("Primary and Secondary contact numbers can't be the same.")

        # --- Validate emails ---
        primary_domain = self.primary_email.split("@")[-1].lower()
        if primary_domain not in ALLOWED_EMAIL_DOMAINS:
            raise ValidationError("Email must be from allowed domains.")

        secondary_domain = self.secondary_email.split("@")[-1].lower()
        if secondary_domain not in ALLOWED_EMAIL_DOMAINS:
            raise ValidationError("Email must be from allowed domains.")

        # Ensure emails are not the same
        if self.primary_email.lower() == self.secondary_email.lower():
            raise ValidationError("Primary and Secondary emails can't be the same.")

        # --- Validate city, state, country (letters + spaces only) ---
        for field_name in ["city", "state", "country"]:
            value = getattr(self, field_name)
            if value and not re.match(r'^[A-Za-z ]+$', value):
                raise ValidationError({
                    field_name: f"{field_name.capitalize()} can contain letters and spaces only."
                })

        # --- Ensure city, state, country are not the same ---
        if self.city and self.state and self.city.lower() == self.state.lower():
            raise ValidationError({"state": "State can't be the same as City."})

        if self.city and self.country and self.city.lower() == self.country.lower():
            raise ValidationError({"country": "Country can't be the same as City."})

        if self.state and self.country and self.state.lower() == self.country.lower():
            raise ValidationError({"country": "Country can't be the same as State."})

        return super().clean()

    def __str__(self):
        return f"{self.first_name}_{self.last_name}_{self.primary_contact}"

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Contact"
        ordering = ['first_name', 'last_name']


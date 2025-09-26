from django import forms
from .models import Contact
import re
from contacts.utils import (
    contact_input_tailwind_classes, contact_input_tailwind_file_classes, contact_textarea_tailwind_classes
)


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = [
            "first_name", "last_name",
            "primary_contact", "secondary_contact",
            "address", "city", "state", "country",
            "primary_email", "secondary_email",
            "image", "is_favorite", "is_emergency_contact"
        ]
        widgets = {
            "first_name": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "First Name",
                "pattern": "^[A-Za-z]+$",
                "title": "First name can contain only letters."
            }),
            "last_name": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "Last Name",
                "pattern": "^[A-Za-z]+$",
                "title": "Last name can contain only letters."
            }),
            "primary_contact": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "Primary Contact",
                "pattern": "^[0-9]{10,13}$",
                "title": "Enter 10–13 digit number."
            }),
            "secondary_contact": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "Secondary Contact",
                "pattern": "^[0-9]{10,13}$",
                "title": "Enter 10–13 digit number."
            }),
            "address": forms.Textarea(attrs={
                'class':contact_textarea_tailwind_classes,
                "rows": 3, 
                "placeholder": "Address"
            }),
            "city": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "City",
                "pattern": "^[A-Za-z ]+$",
                "title": "City can contain only letters and spaces."
            }),
            "state": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "State",
                "pattern": "^[A-Za-z ]+$",
                "title": "State can contain only letters and spaces."
            }),
            "country": forms.TextInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "Country",
                "pattern": "^[A-Za-z ]+$",
                "title": "Country can contain only letters and spaces."
            }),
            "primary_email": forms.EmailInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "Primary Email",
                "title": "Enter a valid email (only Gmail, Yahoo, Outlook, Hotmail, Live allowed)."
            }),
            "secondary_email": forms.EmailInput(attrs={
                'class':contact_input_tailwind_classes,
                "placeholder": "Secondary Email",
                "title": "Enter a valid email (only Gmail, Yahoo, Outlook, Hotmail, Live allowed)."
            }),
            "image": forms.ClearableFileInput(attrs={
                'class':contact_input_tailwind_file_classes,
                "title": "Valid image format (only JPG, JPEG, PNG allowed)."
            }),
        }

    # Extra form-level validation (runs in addition to model.clean)
    def clean_secondary_contact(self):
        primary = self.cleaned_data.get("primary_contact")
        secondary = self.cleaned_data.get("secondary_contact")
        if primary and secondary and primary == secondary:
            raise forms.ValidationError("Primary and Secondary contact numbers cannot be the same.")
        return secondary

    def clean_secondary_email(self):
        primary = self.cleaned_data.get("primary_email")
        secondary = self.cleaned_data.get("secondary_email")
        if primary and secondary and primary.lower() == secondary.lower():
            raise forms.ValidationError("Primary and Secondary emails cannot be the same.")
        return secondary

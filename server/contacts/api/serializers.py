from rest_framework import serializers
from contacts.models import Contact
from django.utils import timezone
import re


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = (
            "id", "first_name", "last_name",
            "primary_contact", "secondary_contact",
            "address", "city", "state", "country",
            "primary_email", "secondary_email",
            "image", "is_favorite", "is_emergency_contact",
            "category"
        )
        read_only_fields = ("id", "created_at", "updated_at", )



    def validate(self, attrs):
        name_pattern = r'^[A-Za-z]+$' 
        contact_pattern = r'^\d{10,13}$' 
        address_pattern = r'^[A-Za-z ]+$'
        ALLOWED_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com"]


        first_name = attrs.get("first_name", getattr(self.instance, "first_name", None))
        last_name = attrs.get("last_name", getattr(self.instance, "last_name", None))
        primary_contact = attrs.get("primary_contact", getattr(self.instance, "primary_contact", None))
        secondary_contact = attrs.get("secondary_contact", getattr(self.instance, "secondary_contact", None))
        city = attrs.get("city", getattr(self.instance, "city", None))
        state = attrs.get("state", getattr(self.instance, "state", None))
        country = attrs.get("country", getattr(self.instance, "country", None))
        primary_email = attrs.get("primary_email", getattr(self.instance, "primary_email", None))
        secondary_email = attrs.get("secondary_email", getattr(self.instance, "secondary_email", None))

        # --- Validate first_name and last_name ---
        if first_name and not re.match(name_pattern, first_name):
            raise serializers.ValidationError({
                "first_name":"First name can contain letters only."
            })
        # --- Validate first_name and last_name ---
        if last_name and not re.match(name_pattern, last_name):
            raise serializers.ValidationError({
                "last_name":"Last name can contain letters only."
            })

        if first_name and last_name and first_name.lower() == last_name.lower():
            raise serializers.ValidationError({
                "first_name":"First name and Last name can not be same."
            })

        # --- Validate contact pattern ---
        if not primary_contact and not re.match(contact_pattern, primary_contact):
            raise serializers.ValidationError({
                "primary_contact":"Primary contact must be 10–13 digits."
            })

        if not secondary_contact and not re.match(contact_pattern, secondary_contact):
            raise serializers.ValidationError({
                "secondary_contact":"Secondary contact must be 10–13 digits."
            })

        if primary_contact and secondary_contact and primary_contact == secondary_contact:
            raise serializers.ValidationError({
                "primary_contact":"Primary contact and Secondary contact cannot be the same."
            })

        # --- Validate emails ---
        primary_domain = primary_email.split("@")[-1].lower()
        if primary_domain not in ALLOWED_EMAIL_DOMAINS:
            raise serializers.ValidationError({
                "primary_email":"Email must be from allowed domains - \'gmail.com\', \'yahoo.com\', \'outlook.com\', \'hotmail.com\', \'live.com\'."
            })

        secondary_domain = secondary_email.split("@")[-1].lower()
        if secondary_domain not in ALLOWED_EMAIL_DOMAINS:
            raise serializers.ValidationError({
                "secondary_email":"Email must be from allowed domains - \'gmail.com\', \'yahoo.com\', \'outlook.com\', \'hotmail.com\', \'live.com\'."
            })

        if primary_email and secondary_email and primary_email.lower() == secondary_email.lower():
            raise serializers.ValidationError({
                "primary_email":"Primary email and Secondary email cannot be the same."
            })

        if city and not re.match(address_pattern, city):
            raise serializers.ValidationError({
                "city":"City can contain letters and spaces only."
            })

        if state and not re.match(address_pattern, state):
            raise serializers.ValidationError({
                "state":"State can contain letters and spaces only."
            })

        if country and not re.match(address_pattern, country):
            raise serializers.ValidationError({
                "country":"Country can contain letters and spaces only."
            })

        # --- Ensure city, state, country are not the same ---
        if city and state and city.lower() == state.lower():
            raise serializers.ValidationError({"state": "State can't be the same as City."})

        if city and country and city.lower() == country.lower():
            raise serializers.ValidationError({"country": "Country can't be the same as City."})

        if state and country and state.lower() == country.lower():
            raise serializers.ValidationError({"country": "Country can't be the same as State."})

        return attrs

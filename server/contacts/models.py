from django.db import models
from django.core.exceptions import ValidationError
from accounts.models import CustomUser
from django.utils import timezone
import re
from contacts.utils import (
    CONTACT_GROUP, COMMUNICATION_METHOD, rename_contact_image
)
from accounts.utils import validate_file_mime_type, ext_validator
from contacts.field_validators import (
    NAME_REGEX, CONTACT_REGEX, validate_first_name, validate_middle_name, validate_last_name, validate_nick_name, 
    validate_primary_contact, validate_alternate_contact, validate_birth_date
)
from datetime import date

class Contact(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="contacts")

    # Basic Information
    first_name = models.CharField(
        max_length=25,
        blank=False,
        validators=[validate_first_name]
    )
    middle_name = models.CharField(
        max_length=25, 
        blank=True,
        validators=[validate_middle_name]
    )
    last_name = models.CharField(
        max_length=25, 
        validators=[validate_last_name],
        blank=False,
    )
    nick_name = models.CharField(
        max_length=25, 
        validators=[validate_nick_name],
        blank=True,
    )
    birth_date = models.DateField(
        blank=True, 
        null=True,
        validators=[validate_birth_date],
    ) 

    # Communication Information
    primary_contact = models.CharField(
        max_length=13, 
        blank=False,
        validators=[validate_primary_contact]
    )
    alternate_contact = models.CharField(
        max_length=13, 
        blank=True,
        validators=[validate_alternate_contact]
    )
    primary_email = models.EmailField(blank=True)
    alternate_email = models.EmailField(blank=True)

    # Social Media Accounts
    linkedin_username = models.CharField(
        max_length=40, 
        blank=True
    )
    instagram_username = models.CharField(
        max_length=40, 
        blank=True
    )
    github_username = models.CharField(
        max_length=40, 
        blank=True
    )
    facebook_username = models.CharField(
        max_length=40, 
        blank=True
    )
    twitter_x_username = models.CharField(
        max_length=40, 
        blank=True
    )

    # Address
    address = models.CharField(
        max_length=100, 
        blank=False
    )
    city = models.CharField(
        max_length=50, 
        blank=False
    )
    state = models.CharField(
        max_length=50, 
        blank=True
    )
    country = models.CharField(
        max_length=50, 
        blank=True, 
        default="India"
    )

    # Professional Details
    company_name = models.CharField(
        max_length=50, 
        blank=True
    )
    job_title = models.CharField(
        max_length=30, 
        blank=True
    )
    work_email = models.EmailField(blank=True)
    work_phone = models.CharField(
        max_length=15, 
        blank=True
    )
    website = models.CharField(
        max_length=100, 
        blank=True
    )

    # Optional
    preferred_communication_method = models.CharField(
        max_length=15, 
        choices=COMMUNICATION_METHOD, 
        blank=False, 
        null=False
    )
    contact_group = models.CharField(
        max_length=15, 
        choices=CONTACT_GROUP, 
        blank=False, 
        null=False
    )
    is_emergency = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)

    notes = models.TextField(blank=True)
    contact_image = models.FileField(upload_to=rename_contact_image, 
        validators=[ext_validator, validate_file_mime_type],
        blank=True, 
        null=True
    )
    

    def clean(self):
        super().clean()
        primary = self.primary_email
        alternate = self.alternate_email
        
        # Name validation
        if not NAME_REGEX.match(self.first_name):
            raise ValidationError({"first_name":"Invalid First name format."})
        if not NAME_REGEX.match(self.middle_name):
            raise ValidationError({"middle_name":"Invalid Middle name format."})
        if not NAME_REGEX.match(self.last_name):
            raise ValidationError({"last_name":"Invalid Last name format."})
        if not NAME_REGEX.match(self.nick_name):
            raise ValidationError({"nick_name":"Invalid Nick name format."})
        if self.first_name.lowe() == self.last_name.lower():
            raise ValidationError("First and Last name can not be same.")
        
        # Contact validation
        if not CONTACT_REGEX.match(self.primary_contact):
            raise ValidationError({"primary_contact": "Invalid contact format."})
        if not CONTACT_REGEX.match(self.alternate_contact):
            raise ValidationError({"alternate_contact": "Invalid contact format."})
        if self.alternate_contact and self.primary_contact == self.alternate_contact:
            raise ValidationError({"alternate_contact": "Alternate and Primary contact can not be same."})

        # Birth date validation
        if self.birth_date:
            raise ValidationError({"birth_date":"Birth date can not be in the future."})

        # Email validation
        if primary:
            if '@' not in primary or '.' not in primary.split('@')[-1]:
               raise ValidationError({"primary_email":"Primary email is invalid."})
        if alternate:
            if '@' not in alternate or '.' not in alternate.split('@')[-1]:
               raise ValidationError({"alternate_email":"Alternate email is invalid."})
        if primary and alternate and primary.lower() == alternate.lower():
            raise ValidationError({"alternate_email":"Alternate email can not be same as primary email ."})
            
                

    def __str__(self):
        return f"{self.user.username} {self.first_name} {self.primary_contact}"
    

    class Meta:
        verbose_name = "Contact" 
        verbose_name_plural = "Contacts" 

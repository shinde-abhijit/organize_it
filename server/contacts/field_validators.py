import re
from django.core.exceptions import ValidationError
from datetime import date

NAME_REGEX = re.compile(r'^[A-Za-z\s-]+$')
CONTACT_REGEX = re.compile(r'\d{10,13}$')

# Name Validation
def validate_first_name(value):
    if not NAME_REGEX.match(value):
        raise ValidationError("First name can only contain letters, spaces or hyphens.")
    if len(value) < 2:
        raise ValidationError("First name must be at least 2 characters long.")

def validate_middle_name(value):
    if not NAME_REGEX.match(value):
        raise ValidationError("Middle name can only contain letters, spaces or hyphens.")

def validate_last_name(value):
    if not NAME_REGEX.match(value):
        raise ValidationError("Last name can only contain letters, spaces or hyphens.")

def validate_nick_name(value):
    if not NAME_REGEX.match(value):
        raise ValidationError("Last name can only contain letters, spaces or hyphens.")

# Contact Validation
def validate_primary_contact(value):
    if not CONTACT_REGEX.match(value):
        raise ValidationError("Contact Number must be 10 to 13 digits long.")

def validate_alternate_contact(value):
    if not CONTACT_REGEX.match(value):
        raise ValidationError("Contact Number must be 10 to 13 digits long.")

def validate_birth_date(value):
    today = date.today()
    if value > today:
        raise ValidationError("Birth date can not be in the future.")
        
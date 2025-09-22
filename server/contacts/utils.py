import os
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import magic


CONTACT_GROUP = [
    ("Mother", "Mother"),
    ("Father", "Mother"),
    ("Brother", "Brother"),
    ("Sister", "Mother"),
    ("Colleague", "Colleague"),
    ("Family", "Family"),
    ("Friends", "Friends"),
    ("Manager", "Manager"),
    ("Client", "Client"),
    ("Other", "Other"),
    ("Neighbors", "Neighbors"),
    ("Relatives", "Relatives"),
    ("Work", "Work"),
]

COMMUNICATION_METHOD = [
    ("Call", "Call"), 
    ("Email", "Email"), 
    ("SMS", "SMS"), 
    ("Other", "Other"), 
]

def rename_contact_image(instance, filename):
    # File extension
    ext = filename.split('.')[-1].lower()
    # Get first and last name, fallback if empty
    username = instance.user.username if instance.username else instance.user.first_name
    first = instance.first_name if instance.first_name else "user"
    primary_contact = instance.primary_contact if instance.primary_contact else "contact"
    # Clean spaces and lowercase
    first = first.strip().replace(" ", "_").lower()
    primary_contact = primary_contact.strip().replace(" ", "_").lower()
    # Current datetime
    timestamp = timezone.now().strftime("%Y%m%d%H%M%S")
    # New filename
    new_filename = f"{primary_contact}_{first}_{timestamp}.{ext}"
    # Folder path: each image gets its own folder
    folder_name = f"{username}_{primary_contact}_{first}_{timestamp}"
    return os.path.join("user_contact_images", folder_name, new_filename)
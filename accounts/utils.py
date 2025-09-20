import os
from django.utils import timezone
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import magic

ext_validator = FileExtensionValidator(['png', 'jpg', 'jpeg'])

def rename_profile_image(instance, filename):
    # File extension
    ext = filename.split('.')[-1].lower()
    # Get first and last name, fallback if empty
    first = instance.first_name if instance.first_name else "user"
    last = instance.last_name if instance.last_name else "profile"
    # Clean spaces and lowercase
    first = first.strip().replace(" ", "_").lower()
    last = last.strip().replace(" ", "_").lower()
    # Current datetime
    timestamp = timezone.now().strftime("%Y%m%d%H%M%S")
    # New filename
    new_filename = f"{first}_{last}_{timestamp}.{ext}"
    # Folder path: each image gets its own folder
    folder_name = f"{first}_{last}_{timestamp}"
    return os.path.join("profile_pics", folder_name, new_filename)


def validate_file_mime_type(file):
    accept = ['image/jpeg', 'image/jpg', 'image/png']
    file_mime_type = magic.from_buffer(file.read(1024), mime=True)
    if file_mime_type not in accept:
        raise ValidationError("Unsupported file type.")

account_input_tailwind_classes = (
    "w-full px-4 py-2 rounded-lg shadow-sm border-none outline-none "
    "ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 "
    "disabled:bg-gray-100 disabled:cursor-not-allowed "
    "placeholder-gray-400 text-gray-800 "
    "transition duration-200 ease-in-out "
)

account_input_tailwind_file_classes = (
    "block w-full text-sm text-gray-700 "
    "file:mr-4 file:py-2 file:px-4 "
    "file:rounded-lg file:border-0 "
    "file:text-sm file:font-semibold "
    "file:bg-blue-600 file:text-white "
    "hover:file:bg-blue-700 "
    "cursor-pointer"
)

account_textarea_tailwind_classes = (
    "w-full px-4 py-2 rounded-lg shadow-sm border-none outline-none h-20 resize-none "
    "ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 "
    "disabled:bg-gray-100 disabled:cursor-not-allowed "
    "placeholder-gray-400 text-gray-800 "
    "transition duration-200 ease-in-out "
)
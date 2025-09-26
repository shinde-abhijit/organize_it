from django.contrib import admin
from contacts.models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "primary_contact", "primary_email", "city", "state", "country", "is_favorite", "is_emergency_contact")
    search_fields = ("first_name", "last_name", "primary_contact", "primary_email", "city", "state", "country")
    list_filter = ("is_favorite", "is_emergency_contact", "city", "state", "country")
    ordering = ("first_name", "last_name")
    readonly_fields = ("created_at", "updated_at")

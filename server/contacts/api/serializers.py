from rest_framework import serializers
from contacts.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        # fields = ( "id", "title", "priority", "due_date", "is_completed", )
        # read_only_fields = ("id",)

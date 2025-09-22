from rest_framework import serializers
from todos.models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ( "id", "title", "priority", "due_date", "is_completed", )
        read_only_fields = ("id",)

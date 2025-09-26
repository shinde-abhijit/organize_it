from rest_framework import serializers
from todos.models import Todo
from django.utils import timezone

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "title", "priority", "due_date", "is_completed")
        read_only_fields = ("id",)

    def validate(self, attrs):
        due_date = attrs.get("due_date", getattr(self.instance, "due_date", None))
        is_completed = attrs.get("is_completed", getattr(self.instance, "is_completed", False))
        today = timezone.now().date()

        if due_date and is_completed and due_date > today:
            raise serializers.ValidationError({
                "is_completed": "Cannot mark as completed. Due date is in the future."
            })

        return attrs

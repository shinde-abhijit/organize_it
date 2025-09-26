from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from todos.models import Todo
from todos.api.serializers import TodoSerializer
from rest_framework.exceptions import PermissionDenied


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return todos for the logged-in user
        return Todo.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Attach the logged-in user automatically
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You cannot edit someone else's todo")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You cannot delete someone else's todo")
        instance.delete()
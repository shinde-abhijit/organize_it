from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from todos.models import Todo
from todos.api.serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]  # allow anyone to register

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # ✅ attach logged-in user
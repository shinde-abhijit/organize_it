from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from contacts.models import Contact
from contacts.api.serializers import ContactSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]  # allow anyone to register

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # ✅ attach logged-in user
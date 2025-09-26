from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from contacts.models import Contact
from contacts.api.serializers import ContactSerializer
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]
    
    # Optional: enable DRF ordering
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'primary_contact', 'primary_email']
    ordering_fields = ['first_name', 'last_name', 'primary_contact', 'created_at']
    ordering = ['-created_at']  # default ordering

    def get_queryset(self):
        # Base queryset: only contacts of logged-in user
        queryset = Contact.objects.filter(user=self.request.user)
        
        # Optional: manual search filtering (if not using DRF SearchFilter)
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(primary_contact__icontains=search) |
                Q(primary_email__icontains=search)
            )
        
        # Optional: ordering via query param ?ordering=field or ?ordering=-field
        ordering = self.request.query_params.get('ordering')
        if ordering:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by('-created_at')

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You cannot edit someone else's contact.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You cannot delete someone else's contact.")
        instance.delete()

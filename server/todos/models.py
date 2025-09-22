from django.db import models
from accounts.models import CustomUser
from django.core.exceptions import ValidationError
from todos.utils import TODO_PRIORITY
from django.utils import timezone


class Todo(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="todos")
    title = models.CharField(max_length=150, blank=False)
    priority = models.CharField(max_length=10, default="Medium", choices=TODO_PRIORITY, blank=False)
    due_date = models.DateField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)  # 👈 add this
    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)
    
    def clean(self):
        """Custom validation rules"""

        # Ensure due_date is not in the past
        if self.due_date and self.due_date < timezone.now().date():
            raise ValidationError({"due_date": "Due date cannot be in the past."})

        # Rule 1: If due_date exists → cannot mark as completed
        if self.due_date and self.is_completed:
            raise ValidationError("A todo with a due date cannot be marked as completed directly. Remove the due date first.")

        # Rule 2: If marked complete → due_date must be empty
        if self.is_completed and self.due_date:
            raise ValidationError({"due_date": "Completed todos cannot have a due date."})

    def __str__(self):
        return f"{self.title} - {self.user.username}"

    class Meta:
        verbose_name = "Todo"
        verbose_name_plural = "Todos"
        unique_together = ('user', 'title',)
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "is_completed"]),
        ]
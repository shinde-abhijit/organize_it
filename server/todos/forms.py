from django import forms
from todos.models import Todo
from todos.utils import todo_input_classes
from django.utils import timezone

class TodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ("title", "priority", "due_date", "is_completed", )
        labels = {
            "title":"Title",
            "priority":"Priority",
            "due_date":"Due Date",
            "is_completed":"Check to Complete",
        }
        widgets = {
            "title": forms.TextInput(attrs={
                'class': todo_input_classes,
                'placeholder':'Enter Todo Title',
            }),
            "priority": forms.Select(attrs={
                'class': todo_input_classes,
            }),
            "due_date": forms.DateInput(attrs={
                'class': todo_input_classes,
                'type': "date",
            }),
            "is_completed": forms.CheckboxInput(attrs={
            }),
        }

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop("user", None)  # capture user from view
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        title = cleaned_data.get("title")
        due_date = cleaned_data.get("due_date")

        # Validate due_date
        if due_date and due_date < timezone.now().date():
            raise forms.ValidationError("Due date cannot be in the past.")

        # Validate duplicate title for the user
        if self.user and Todo.objects.filter(user=self.user, title=title).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("You already have a todo with this title.")

        return cleaned_data
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser
from accounts.utils import ( 
    account_input_tailwind_classes, account_input_tailwind_file_classes, account_textarea_tailwind_classes
)


class UserRegisterForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": account_input_tailwind_classes,
            "placeholder": "Enter a strong password",
        }),
        label="Password"
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": account_input_tailwind_classes,
            "placeholder": "Re-enter your password",
        }),
        label="Confirm Password"
    )

    class Meta:
        model = CustomUser
        fields = ["email", "username", "first_name", "last_name", "contact", "bio", "profile_image"]
        labels = {
            "email": "Email Address",
            "username": "Username",
            "first_name": "First Name",
            "last_name": "Last Name",
            "contact": "Contact Number",
            "bio": "Bio / About You",
            "profile_image": "Profile Picture"
        }
        widgets = {
            "email": forms.EmailInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "e.g. john.doe@gmail.com",
            }),
            "username": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "Choose a unique username",
            }),
            "first_name": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "Enter your first name",
            }),
            "last_name": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "Enter your last name",
            }),
            "contact": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "10–13 digit phone number",
            }),
            "bio": forms.Textarea(attrs={
                "class": account_textarea_tailwind_classes,
                "placeholder": "Tell us something about yourself...",
                "rows": 3,
            }),
            "profile_image": forms.ClearableFileInput(attrs={
                "class": account_input_tailwind_file_classes,
            }),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        if password and confirm_password and password != confirm_password:
            raise forms.ValidationError("Passwords do not match.")
        return cleaned_data

    def clean_password(self):
        password = self.cleaned_data.get("password")
        if password:
            validate_password(password)
        return password

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.get("password")
        if password:
            user.set_password(password)
        if commit:
            user.save()
        return user


class UserLoginForm(AuthenticationForm):
    username = forms.EmailField(
        widget=forms.EmailInput(attrs={
            "class": account_input_tailwind_classes,
            "placeholder": "Email Address",
        }),
        label="Email Address"
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": account_input_tailwind_classes,
            "placeholder": "Password",
        }),
        label="Password"
    )


class UserUpdateForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": account_input_tailwind_classes,
            "placeholder": "Enter a new password (leave blank to keep current)",
        }),
        label="Password",
        required=False
    )

    class Meta:
        model = CustomUser
        fields = ["email", "username", "first_name", "last_name", "contact", "bio", "profile_image"]
        labels = {
            "email": "Email Address",
            "username": "Username",
            "first_name": "First Name",
            "last_name": "Last Name",
            "contact": "Contact Number",
            "bio": "Bio / About You",
            "profile_image": "Profile Picture"
        }
        widgets = {
            "email": forms.EmailInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "e.g. john.doe@gmail.com",
            }),
            "username": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "Choose a unique username",
            }),
            "first_name": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "Enter your first name",
            }),
            "last_name": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "Enter your last name",
            }),
            "contact": forms.TextInput(attrs={
                "class": account_input_tailwind_classes,
                "placeholder": "10–13 digit phone number",
            }),
            "bio": forms.Textarea(attrs={
                "class": account_textarea_tailwind_classes,
                "placeholder": "Tell us something about yourself...",
                "rows": 3,
            }),
            "profile_image": forms.ClearableFileInput(attrs={
                "class": account_input_tailwind_file_classes,
            }),
        }

    def clean_password(self):
        password = self.cleaned_data.get("password")
        if password:
            validate_password(password)
        return password

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.get("password")
        if password:  # only update password if provided
            user.set_password(password)
        if commit:
            user.save()
        return user


class UserDeleteForm(forms.Form):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            "class": account_input_tailwind_classes,
            "placeholder": "Enter your password to delete account",
        }),
        label="Password"
    )

    def __init__(self, user, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = user

    def clean_password(self):
        password = self.cleaned_data.get("password")
        if not self.user.check_password(password):
            raise forms.ValidationError("Incorrect password.")
        return password

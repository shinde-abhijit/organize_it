from rest_framework import serializers
from accounts.models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ["email", "username", "first_name", "last_name", "contact",
                  "bio", "profile_image", "password", "password2"]

    def validate(self, data):
        password = data.get('password')
        password2 = data.get('password2')
        if password or password2:  # Only validate if one of them is provided
            if password != password2:
                raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('password2', None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('password2', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "email",
            "role",
            "date_joined",

            "first_name",
            "last_name",
            "headline",
            "phone",
            "city",

            "bio",
            "skills",
            "experience",

            "linkedin",
            "github",
            "portfolio",

            "resume",
            "profile_picture",
        ]

        read_only_fields = [
            "id",
            "username",
            "role",
            "date_joined",
        ]
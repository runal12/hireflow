from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    job_title = serializers.CharField(
        source="job.title",
        read_only=True,
    )

    # ── Candidate identity ────────────────────────────────────────────────────
    candidate_id = serializers.IntegerField(
        source="candidate.id",
        read_only=True,
    )

    candidate_name = serializers.CharField(
        source="candidate.username",
        read_only=True,
    )

    candidate_first_name = serializers.CharField(
        source="candidate.first_name",
        read_only=True,
    )

    candidate_last_name = serializers.CharField(
        source="candidate.last_name",
        read_only=True,
    )

    candidate_email = serializers.CharField(
        source="candidate.email",
        read_only=True,
    )

    # ── Candidate profile fields ──────────────────────────────────────────────
    candidate_headline = serializers.CharField(
        source="candidate.headline",
        read_only=True,
    )

    candidate_city = serializers.CharField(
        source="candidate.city",
        read_only=True,
    )

    candidate_experience = serializers.IntegerField(
        source="candidate.experience",
        read_only=True,
    )

    candidate_skills = serializers.CharField(
        source="candidate.skills",
        read_only=True,
    )

    candidate_profile_picture = serializers.ImageField(
        source="candidate.profile_picture",
        read_only=True,
    )

    candidate_resume = serializers.FileField(
        source="candidate.resume",
        read_only=True,
    )

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "job_title",
            "candidate",
            "candidate_id",
            "candidate_name",
            "candidate_first_name",
            "candidate_last_name",
            "candidate_email",
            "candidate_headline",
            "candidate_city",
            "candidate_experience",
            "candidate_skills",
            "candidate_profile_picture",
            "candidate_resume",
            "status",
            "created_at",
        ]

        read_only_fields = [
            "candidate",
            "status",
            "created_at",
        ]
# Create your models here.

from django.db import models
from apps.users.models import User


class Job(models.Model):

    class EmploymentType(models.TextChoices):
        FULL_TIME  = "FULL_TIME",  "Full Time"
        PART_TIME  = "PART_TIME",  "Part Time"
        INTERNSHIP = "INTERNSHIP", "Internship"
        CONTRACT   = "CONTRACT",   "Contract"
        REMOTE     = "REMOTE",     "Remote"

    class ExperienceLevel(models.TextChoices):
        ENTRY  = "ENTRY",  "0-1 Years"
        MID    = "MID",    "1-3 Years"
        SENIOR = "SENIOR", "3-5 Years"
        LEAD   = "LEAD",   "5+ Years"

    recruiter = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=255)

    company = models.CharField(max_length=255, blank=True)

    description = models.TextField()

    city = models.CharField(max_length=255)

    employment_type = models.CharField(
        max_length=20,
        choices=EmploymentType.choices
    )

    experience_level = models.CharField(
        max_length=10,
        choices=ExperienceLevel.choices,
        blank=True,
    )

    salary_min = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    salary_max = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
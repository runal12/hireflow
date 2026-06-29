from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q

from .models import Job
from apps.jobs.models import Job
from .serializers import JobSerializer
from apps.users.permissions import IsRecruiter, IsJobOwner


class JobViewSet(ModelViewSet):
    serializer_class = JobSerializer

    def get_queryset(self):
        qs = Job.objects.all().order_by("-created_at")

        search = self.request.query_params.get("search", "").strip()
        if search:
            qs = qs.filter(
                Q(title__icontains=search) |
                Q(company__icontains=search) |
                Q(city__icontains=search)
            )

        location = self.request.query_params.get("location", "").strip()
        if location:
            qs = qs.filter(city__icontains=location)

        emp_type = self.request.query_params.get("type", "").strip()
        if emp_type:
            qs = qs.filter(employment_type=emp_type)

        experience = self.request.query_params.get("experience", "").strip()
        if experience:
            qs = qs.filter(experience_level=experience)

        return qs

    @action(detail=False, methods=["get"])
    def my(self, request):

        jobs = Job.objects.filter(
            recruiter=request.user
        ).order_by("-created_at")

        serializer = self.get_serializer(
            jobs,
            many=True
        )

        return Response(serializer.data)

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsRecruiter()]

        if self.action in ["update", "partial_update", "destroy"]:
            return [IsRecruiter(), IsJobOwner()]

        return [IsAuthenticatedOrReadOnly()]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

    def get_object(self):
        obj = super().get_object()
        self.check_object_permissions(self.request, obj)
        return obj
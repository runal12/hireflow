from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from apps.jobs.models import Job
from django.db.models import Q

from rest_framework.exceptions import ValidationError

from .models import Application
from .serializers import ApplicationSerializer


class ApplicationViewSet(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        if self.request.user.role != "CANDIDATE":
            raise ValidationError({
                "detail": "Only candidates can apply."
            })

        job = serializer.validated_data["job"]

        # Recruiter cannot apply to own job
        if job.recruiter == self.request.user:
            raise ValidationError({
                "detail": "You cannot apply to your own job."
            })

        if Application.objects.filter(
            candidate=self.request.user,
            job=job
        ).exists():

            raise ValidationError({
                "detail": "You have already applied."
            })

        serializer.save(candidate=self.request.user)

    @action(detail=False, methods=["get"])
    def my(self, request):
        applications = Application.objects.filter(
            candidate=request.user
        )

        serializer = self.get_serializer(
            applications,
            many=True
        )

        return Response(serializer.data)


    @action(detail=False, methods=["get"])
    def applicants(self, request):

        job_id = request.query_params.get("job")

        job = Job.objects.get(id=job_id)

        if job.recruiter != request.user:
            raise ValidationError({
                "detail": "Not allowed."
            })

        applications = Application.objects.filter(job=job).select_related("candidate")

        # Optional search: name, skills, city, headline
        search = request.query_params.get("search", "").strip()
        if search:
            applications = applications.filter(
                Q(candidate__first_name__icontains=search) |
                Q(candidate__last_name__icontains=search) |
                Q(candidate__username__icontains=search) |
                Q(candidate__skills__icontains=search) |
                Q(candidate__city__icontains=search) |
                Q(candidate__headline__icontains=search)
            )

        serializer = self.get_serializer(
            applications,
            many=True
        )

        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def check(self, request):

        job_id = request.query_params.get("job")

        exists = Application.objects.filter(
            candidate=request.user,
            job_id=job_id
        ).exists()

        return Response({
            "applied": exists
        })


    @action(detail=True, methods=["patch"])
    def status(self, request, pk=None):

        application = self.get_object()

        if application.job.recruiter != request.user:
            raise ValidationError({
                "detail": "Not allowed."
            })

        status = request.data.get("status")

        if status not in ["ACCEPTED", "REJECTED"]:
            raise ValidationError({
                "detail": "Invalid status."
            })

        application.status = status
        application.save()

        return Response({
            "message": "Application updated."
        })
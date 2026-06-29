from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.exceptions import NotFound

from .models import User
from .serializers import UserSerializer


class MeView(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def patch(self, request):

        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)


class CandidateDetailView(APIView):
    """
    GET /api/users/<pk>/
    Returns a read-only public profile of any candidate.
    Accessible to authenticated users (e.g. recruiters viewing applicants).
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound({"detail": "User not found."})

        serializer = UserSerializer(user)
        return Response(serializer.data)
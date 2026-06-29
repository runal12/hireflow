from django.urls import path

from .views import MeView, CandidateDetailView

urlpatterns = [
    path("me/", MeView.as_view()),
    path("<int:pk>/", CandidateDetailView.as_view()),
]
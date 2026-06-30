from django.urls import path

from .views import MeView, CandidateDetailView, AvatarView

urlpatterns = [
    path("me/",        MeView.as_view()),
    path("me/avatar/", AvatarView.as_view()),
    path("<int:pk>/",  CandidateDetailView.as_view()),
]
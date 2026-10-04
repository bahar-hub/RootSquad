from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    path("projects/", views.projects, name="projects"),
    path("services/", views.services, name="services"),
    path("contact/", views.contact, name="contact"),
    path("estimate/", views.estimate, name="estimate"),
]

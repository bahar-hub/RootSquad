from django.shortcuts import render


def home(request):
    return render(request, "core/home.html")


def about(request):
    return render(request, "core/about.html")


def projects(request):
    return render(request, "core/projects.html")


def services(request):
    return render(request, "core/services.html")


def contact(request):
    return render(request, "core/contact.html")


def estimate(request):
    return render(request, "core/estimate.html")

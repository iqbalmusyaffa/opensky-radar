from django.shortcuts import render


def index(request):
    return render(request, "radar/index.html")
# Create your views here.

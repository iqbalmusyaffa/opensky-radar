from django.urls import path

from . import views

urlpatterns = [
    path("", index, name="index"),
    
    path("api/aircraft/", views.aircraft_list, name="aircraft_list"),
    path("api/followed-aircraft/", views.followed_aircraft_list, name="followed_aircraft_list"),
    path("api/logbook/", views.logbook, name="logbook"),
    path("api/aircraft/<str:icao24>/history/", views.aircraft_history, name="aircraft_history"),
]
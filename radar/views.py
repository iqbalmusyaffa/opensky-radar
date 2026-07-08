import json

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .opensky import fetch_live_aircraft
from .services import (
    follow_aircraft,
    get_followed_aircraft,
)
def index(request):
    return render(request, "radar/index.html")

@csrf_exempt
def aircraft_list(request):
    """
    Mengambil daftar pesawat aktif dari OpenSky.
    """

    if request.method != "GET":
        return JsonResponse(
            {
                "success": False,
                "message": "Method not allowed.",
            },
            status=405,
        )

    aircraft = fetch_live_aircraft(max_results=10)

    return JsonResponse(
        {
            "success": True,
            "data": aircraft,
        }
    )


def follow_aircraft_view(request):
    """
    Follow aircraft.
        Menambahkan pesawat ke daftar Follow.
    """
    
    if request.method != "POST":
        return JsonResponse(
            {
                "success": False,
                "message": "Method not allowed.",
            },
            status=405,
        )
    
    try:
        data = json.loads(request.body)
        
        icao24 = data.get("icao24")
        callsign = data.get("callsign")
        origin_country = data.get("origin_country")

        if not icao24:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Missing required field: icao24.",
                },
                status=400,
            )

        aircraft = follow_aircraft(
            icao24=icao24,
            callsign=callsign,
            origin_country=origin_country,
        )

        return JsonResponse(
            {
                "success": True,
                "data": {
                    "icao24": aircraft.icao24,
                    "callsign": aircraft.callsign,
                    "origin_country": aircraft.origin_country,
                    "is_following": aircraft.is_following,
                },
            }
        )
    except json.JSONDecodeError:
        return JsonResponse(
            {
                "success": False,
                "message": "Invalid JSON.",
            },
            status=400,
        )
    except Exception as e:
        return JsonResponse(
            {
                "success": False,
                "message": str(e),
            },
            status=500,
        )


def followed_aircraft_list(request):
    """
    Menampilkan daftar pesawat yang sedang diikuti.
    """

    if request.method != "GET":
        return JsonResponse(
            {
                "success": False,
                "message": "Method not allowed.",
            },
            status=405,
        )

    followed_aircraft = get_followed_aircraft()

    return JsonResponse(
        {
            "success": True,
            "data": [
                {
                    "icao24": aircraft.icao24,
                    "callsign": aircraft.callsign,
                    "origin_country": aircraft.origin_country,
                    "is_following": aircraft.is_following,
                }
                for aircraft in followed_aircraft
            ],
        }
    )
    
def logbook(request):
    """
    Menampilkan seluruh logbook.
    Akan diimplementasikan pada Part 5.
    """

    return JsonResponse(
        {
            "success": False,
            "message": "Not implemented yet.",
        },
        status=501,
    )


def aircraft_history(request, icao24):
    """
    Menampilkan history satu pesawat.
    Akan diimplementasikan pada Part 5.
    """

    return JsonResponse(
        {
            "success": False,
            "message": "Not implemented yet.",
            "icao24": icao24,
        },
        status=501,
    )
    
# Create your views here.

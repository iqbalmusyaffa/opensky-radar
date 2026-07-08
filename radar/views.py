import json

from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import FollowedAircraft
from .models import FlightLog

from .opensky import fetch_live_aircraft
from .services import (
    follow_aircraft,
    get_followed_aircraft,
    unfollow_aircraft,
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

@csrf_exempt
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
    Menampilkan seluruh pesawat yang pernah di-follow.
    """

    if request.method != "GET":
        return JsonResponse(
            {
                "success": False,
                "message": "Method not allowed.",
            },
            status=405,
        )

    aircraft = FollowedAircraft.objects.all()

    return JsonResponse(
        {
            "success": True,
            "data": [
                {
                    "icao24": a.icao24,
                    "callsign": a.callsign,
                    "origin_country": a.origin_country,
                    "is_following": a.is_following,
                    "followed_at": a.followed_at.isoformat(),
                    "total_logs": a.logs.count(),
                }
                for a in aircraft
            ],
        }
    )

def aircraft_history(request, icao24):
    """
    Menampilkan riwayat penerbangan berdasarkan ICAO24.
    """

    if request.method != "GET":
        return JsonResponse(
            {
                "success": False,
                "message": "Method not allowed.",
            },
            status=405,
        )

    aircraft = get_object_or_404(
        FollowedAircraft,
        icao24=icao24,
    )

    logs = FlightLog.objects.filter(
        followed_aircraft=aircraft
    ).order_by("timestamp")

    return JsonResponse(
        {
            "success": True,
            "aircraft": {
                "icao24": aircraft.icao24,
                "callsign": aircraft.callsign,
                "origin_country": aircraft.origin_country,
                "followed_at": aircraft.followed_at.isoformat(),
            },
            "count": logs.count(),
            "data": [
                {
                    "latitude": log.latitude,
                    "longitude": log.longitude,
                    "altitude": log.altitude,
                    "timestamp": log.timestamp.isoformat(),
                }
                for log in logs
            ],
        }
    )
    
# Create your views here.

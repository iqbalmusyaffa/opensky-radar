from django.http import JsonResponse

from .opensky import fetch_live_aircraft


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


def follow_aircraft(request):
    """
    Follow aircraft.
    Akan diimplementasikan pada Part 3.
    """

    return JsonResponse(
        {
            "success": False,
            "message": "Not implemented yet.",
        },
        status=501,
    )


def followed_aircraft_list(request):
    """
    Menampilkan daftar pesawat yang sedang diikuti.
    Akan diimplementasikan pada Part 3.
    """

    return JsonResponse(
        {
            "success": False,
            "message": "Not implemented yet.",
        },
        status=501,
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

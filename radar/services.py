
from .models import FollowedAircraft, FlightLog


def follow_aircraft(
    icao24,
    callsign=None,
    origin_country=None,
):
    """
    Menambahkan atau mengaktifkan kembali pesawat ke daftar follow.
    """

    aircraft, created = FollowedAircraft.objects.get_or_create(
        icao24=icao24,
        defaults={
            "callsign": callsign,
            "origin_country": origin_country,
        },
    )

    if not created:
        aircraft.callsign = callsign
        aircraft.origin_country = origin_country
        aircraft.is_following = True

        aircraft.save(
            update_fields=[
                "callsign",
                "origin_country",
                "is_following",
                "updated_at",
            ]
        )

    return aircraft

def get_followed_aircraft():
    """
    Mengambil daftar pesawat yang diikuti
    """

    return FollowedAircraft.objects.filter(
        is_following=True
    )


def unfollow_aircraft(icao24):
    """
    Menghapus pesawat dari daftar follow
    """

    try:
        aircraft = FollowedAircraft.objects.get(
            icao24=icao24
        )

        aircraft.is_following = False
        aircraft.save(
            update_fields=[
                "is_following",
                "updated_at",
            ]
        )

        return aircraft

    except FollowedAircraft.DoesNotExist:
        return None
    
def save_flight_logs(flight_logs):
    """
    Menyimpan log penerbangan ke database.
    """
    followed = {
         aircraft.icao24: aircraft
        for aircraft in get_followed_aircraft()
    }
    
    for item in flight_logs:
        
        followed_aircraft = followed.get(item["icao24"])
        
        if not followed_aircraft: 
            continue
        
        FlightLog.objects.create(
            followed_aircraft=followed_aircraft,
            latitude=item["latitude"],
            longitude=item["longitude"],
            altitude=item["baro_altitude"] or 0,
        )
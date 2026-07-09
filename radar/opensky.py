import json
import time
from dataclasses import dataclass
from pathlib import Path

import requests
from django.conf import settings
from django.utils import timezone

TOKEN_URL = (
    "https://auth.opensky-network.org/auth/realms/opensky-network/"
    "protocol/openid-connect/token"
)

STATES_URL = "https://opensky-network.org/api/states/all"

# Indonesia bounding box
INDONESIA_BBOX = {
    "lamin": -11,
    "lomin": 94,
    "lamax": 8,
    "lomax": 141,
}


@dataclass
class TokenCache:
    access_token: str | None = None
    expires_at: float = 0


_token_cache = TokenCache()


def load_credentials():
    path = Path(settings.BASE_DIR) / "credentials.json"

    if not path.exists():
        raise FileNotFoundError("credentials.json tidak ditemukan.")

    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def get_access_token():
    global _token_cache

    current_time = time.time()

    if (
        _token_cache.access_token
        and current_time < _token_cache.expires_at
    ):
        return _token_cache.access_token

    credentials = load_credentials()

    client_id = credentials.get("clientId")
    client_secret = credentials.get("clientSecret")

    if not client_id or not client_secret:
        raise ValueError(
            "clientId atau clientSecret tidak ditemukan di credentials.json"
        )

    response = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        },
        timeout=10,
    )

    response.raise_for_status()

    token_data = response.json()

    _token_cache.access_token = token_data["access_token"]
    _token_cache.expires_at = (
        current_time + token_data["expires_in"] - 10
    )

    return _token_cache.access_token


def parse_state(state):
    (
        icao24,
        callsign,
        origin_country,
        time_position,
        last_contact,
        longitude,
        latitude,
        baro_altitude,
        on_ground,
        velocity,
        heading,
        vertical_rate,
        sensors,
        geo_altitude,
        squawk,
        spi,
        position_source,
    ) = state

    return {
        "icao24": icao24,
        "callsign": callsign.strip() if callsign else None,
        "origin_country": origin_country,
        "time_position": (
            timezone.datetime.fromtimestamp(time_position).isoformat()
            if time_position
            else None
        ),
        "last_contact": (
            timezone.datetime.fromtimestamp(last_contact).isoformat()
            if last_contact
            else None
        ),
        "longitude": longitude,
        "latitude": latitude,
        "baro_altitude": baro_altitude,
        "on_ground": on_ground,
        "velocity": velocity,
        "heading": heading,
        "vertical_rate": vertical_rate,
        "geo_altitude": geo_altitude,
        "squawk": squawk,
        "spi": spi,
        "position_source": position_source,
    }


from django.core.cache import cache

_last_aircraft_list = []

def fetch_live_aircraft(max_results=10):
    global _last_aircraft_list
    
    cache_key = "live_aircraft_data"
    cached_data = cache.get(cache_key)
    
    if cached_data is not None:
        return cached_data

    params = {
        "lamin": INDONESIA_BBOX["lamin"],
        "lomin": INDONESIA_BBOX["lomin"],
        "lamax": INDONESIA_BBOX["lamax"],
        "lomax": INDONESIA_BBOX["lomax"],
    }
    
    try:
        response = requests.get(STATES_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        if getattr(e, 'response', None) and e.response.status_code == 429:
            return _last_aircraft_list
      
        return _last_aircraft_list

    states = data.get("states") or []
    aircraft_list = []

    for state in states:
        aircraft = parse_state(state)

        if (
            aircraft["latitude"] is None
            or aircraft["longitude"] is None
        ):
            continue

        aircraft_list.append(aircraft)

        if len(aircraft_list) >= max_results:
            break

    _last_aircraft_list = aircraft_list
    cache.set(cache_key, aircraft_list, 12)
    return aircraft_list
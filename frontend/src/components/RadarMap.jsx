import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ResizeMap({ aircraft }) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();

    if (aircraft.length > 0) {
      const points = aircraft
        .filter(
          (item) =>
            item.latitude !== null &&
            item.longitude !== null
        )
        .map((item) => [item.latitude, item.longitude]);

      if (points.length > 0) {
        map.fitBounds(points, {
          padding: [50, 50],
        });
      }
    }
  }, [aircraft, map]);

  return null;
}

const createAirplaneIcon = (heading) => {
  // The PaperAirplaneIcon points diagonally (45 degrees) by default.
  // We subtract 45 so 0 degrees points straight North.
  const rotation = heading !== null ? heading - 45 : -45;
  
  const html = `
    <div style="transform: rotate(${rotation}deg); color: #38bdf8; filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.8));">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 28px; height: 28px;">
        <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
      </svg>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'custom-airplane-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

export default function RadarMap({ aircraft = [] }) {
  return (
    <div className="glass-panel-no-hover h-[650px] overflow-hidden">
      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <ResizeMap aircraft={aircraft} />

        {/* Gunakan tile CartoDB Dark Matter yang lebih elegan untuk radar */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {aircraft
          .filter(
            (item) =>
              item.latitude !== null &&
              item.longitude !== null
          )
          .map((item) => (
            <Marker
              key={item.icao24}
              position={[item.latitude, item.longitude]}
              icon={createAirplaneIcon(item.heading)}
            >
              <Popup className="premium-popup">
                <div className="space-y-1 text-sm text-slate-800">
                  <p>
                    <strong>Callsign:</strong>{" "}
                    {item.callsign?.trim() || "-"}
                  </p>

                  <p>
                    <strong>ICAO24:</strong>{" "}
                    {item.icao24}
                  </p>

                  <p>
                    <strong>Country:</strong>{" "}
                    {item.origin_country}
                  </p>

                  <p>
                    <strong>Speed:</strong>{" "}
                    {item.velocity
                      ? `${Math.round(
                          item.velocity * 3.6
                        )} km/h`
                      : "-"}
                  </p>

                  <p>
                    <strong>Altitude:</strong>{" "}
                    {item.baro_altitude
                      ? `${Math.round(
                          item.baro_altitude
                        )} m`
                      : "-"}
                  </p>
                  
                  <p>
                    <strong>Heading:</strong>{" "}
                    {item.heading !== null
                      ? `${Math.round(item.heading)}°`
                      : "-"}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

function ResizeMap() {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);

    return null;
}

export default function RadarMap() {
    return (
        <MapContainer
            center={[-2.5, 118]}
            zoom={5}
            style={{ height: "500px", width: "100%" }}
        >
            <ResizeMap />

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
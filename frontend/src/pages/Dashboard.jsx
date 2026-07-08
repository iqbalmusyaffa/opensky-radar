import { useEffect, useState } from "react";

import RadarCard from "../components/RadarCard";
import AircraftTable from "../components/AircraftTable";
import FlightHistory from "../components/FlightHistory";
import RadarMap from "../components/RadarMap";
import Loading from "../components/Loading";

import { getFollowedAircraft } from "../api/radarApi";

export default function Dashboard() {
    const [aircraft, setAircraft] = useState([]);
    const [following, setFollowing] = useState([]);

    const [selectedAircraft, setSelectedAircraft] = useState(null);

    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFollowing();

        const socket = new WebSocket(
            "ws://127.0.0.1:8000/ws/radar/"
        );

        socket.onopen = () => {
            console.log("WebSocket Connected");
            setConnected(true);
            setLoading(false);
        };

        socket.onclose = () => {
            console.log("WebSocket Closed");
            setConnected(false);
        };

        socket.onerror = (err) => {
            console.error(err);
            setConnected(false);
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "radar_update") {
                setAircraft(message.aircraft);
            }
        };

        return () => socket.close();
    }, []);

    const loadFollowing = async () => {
        try {
            const response = await getFollowedAircraft();

            setFollowing(
                response.data.map((item) => item.icao24)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleFollow = (icao24) => {
        setFollowing((prev) => [...prev, icao24]);
    };

    if (loading) {
        return (
            <Loading
                title="Connecting Radar"
                description="Waiting for WebSocket..."
            />
        );
    }

    return (
        <div className="space-y-6">

            {/* Statistic */}
            <div className="grid gap-6 md:grid-cols-4">

                <RadarCard
                    title="Aircraft"
                    value={aircraft.length}
                    icon="aircraft"
                    color="blue"
                />

                <RadarCard
                    title="Following"
                    value={following.length}
                    icon="follow"
                    color="emerald"
                />

                <RadarCard
                    title="Flight Logs"
                    value="-"
                    icon="logs"
                    color="amber"
                />

                <RadarCard
                    title="WebSocket"
                    value={connected ? "Online" : "Offline"}
                    icon="status"
                    color={connected ? "emerald" : "red"}
                />

            </div>

            {/* Table + Map */}

            <div className="grid gap-6 lg:grid-cols-5">

                <div className="lg:col-span-2">
                    <AircraftTable
                        aircraft={aircraft}
                        following={following}
                        onFollow={handleFollow}
                        onView={(item) =>
                            setSelectedAircraft(item.icao24)
                        }
                    />
                </div>

                <div className="lg:col-span-3">
                    <RadarMap aircraft={aircraft} />
                </div>

            </div>

            {selectedAircraft && (
                <FlightHistory
                    icao24={selectedAircraft}
                    onClose={() =>
                        setSelectedAircraft(null)
                    }
                />
            )}

        </div>
    );
}
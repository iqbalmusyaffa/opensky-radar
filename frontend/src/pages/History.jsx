import { useNavigate, useParams } from "react-router-dom";

import FlightHistory from "../components/FlightHistory";

export default function History() {
    const { icao24 } = useParams();
    const navigate = useNavigate();

    if (!icao24) {
        return (
            <div className="flex flex-col items-center justify-center h-full space-y-4 pt-20">
                <h2 className="text-3xl font-bold text-white">No Aircraft Selected</h2>
                <p className="text-slate-400">Please select an aircraft from the logbook to view its history.</p>
                <button
                    onClick={() => navigate("/logbook")}
                    className="rounded-lg bg-blue-600 px-6 py-2 mt-4 text-white transition hover:bg-blue-700"
                >
                    Go to Logbook
                </button>
            </div>
        );
    }

    return (
        <FlightHistory
            icao24={icao24}
            onClose={() => navigate(-1)}
        />
    );
}
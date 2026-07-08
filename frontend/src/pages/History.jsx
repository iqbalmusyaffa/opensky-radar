import { useNavigate, useParams } from "react-router-dom";

import FlightHistory from "../components/FlightHistory";

export default function History() {
    const { icao24 } = useParams();
    const navigate = useNavigate();

    return (
        <FlightHistory
            icao24={icao24}
            onClose={() => navigate(-1)}
        />
    );
}
import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAircraft = async () => {
    const { data } = await api.get("/aircraft/");
    return data;
};

export const followAircraft = async (aircraft) => {
    const { data } = await api.post("/follow-aircraft/", {
        icao24: aircraft.icao24,
        callsign: aircraft.callsign,
        origin_country: aircraft.origin_country,
    });

    return data;
};

export const getFollowedAircraft = async () => {
    const { data } = await api.get("/followed-aircraft/");
    return data;
};

export const getLogbook = async () => {
    const { data } = await api.get("/logbook/");
    return data;
};

export const getAircraftHistory = async (icao24) => {
    const { data } = await api.get(
        `/aircraft/${icao24}/history/`
    );

    return data;
};

export default api;
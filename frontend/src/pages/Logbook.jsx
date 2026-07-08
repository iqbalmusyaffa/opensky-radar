import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import { getLogbook } from "../api/radarApi";

export default function Logbook() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [aircraft, setAircraft] = useState([]);

    useEffect(() => {
        loadLogbook();
    }, []);

    const loadLogbook = async () => {
        try {
            setLoading(true);

            const response = await getLogbook();

            setAircraft(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Loading
                title="Loading Logbook"
                description="Fetching followed aircraft..."
            />
        );
    }

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-white">
                    Flight Logbook
                </h1>

                <p className="mt-2 text-slate-400">
                    Aircraft that have been followed.
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">

                <table className="min-w-full">

                    <thead className="bg-slate-800 text-slate-300">

                        <tr>
                            <th className="px-4 py-3 text-left">
                                ICAO24
                            </th>

                            <th className="px-4 py-3 text-left">
                                Callsign
                            </th>

                            <th className="px-4 py-3 text-left">
                                Country
                            </th>

                            <th className="px-4 py-3 text-center">
                                Following
                            </th>

                            <th className="px-4 py-3 text-center">
                                Logs
                            </th>

                            <th className="px-4 py-3 text-center">
                                Action
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {aircraft.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={6}
                                    className="py-12 text-center text-slate-400"
                                >
                                    No aircraft followed yet.
                                </td>

                            </tr>

                        ) : (

                            aircraft.map((item) => (

                                <tr
                                    key={item.icao24}
                                    className="border-b border-slate-800 hover:bg-slate-800/40"
                                >

                                    <td className="px-4 py-3 font-mono text-blue-400">
                                        {item.icao24}
                                    </td>

                                    <td className="px-4 py-3 text-white">
                                        {item.callsign || "-"}
                                    </td>

                                    <td className="px-4 py-3 text-slate-300">
                                        {item.origin_country}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {item.is_following ? (
                                            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs text-white">
                                                Following
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                                                Stopped
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 text-center text-white">
                                        {item.total_logs}
                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/history/${item.icao24}`
                                                )
                                            }
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                                        >
                                            View History
                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
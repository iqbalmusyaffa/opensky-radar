import { useEffect, useState } from "react";
import { getAircraftHistory } from "../api/radarApi";
import Loading from "./Loading";

export default function FlightHistory({ icao24, onClose }) {
  const [loading, setLoading] = useState(true);
  const [aircraft, setAircraft] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!icao24) return;

    fetchHistory();
  }, [icao24]);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await getAircraftHistory(icao24);

      setAircraft(response.aircraft);
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-5xl rounded-xl bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700 p-5">
          <div>
            <h2 className="text-2xl font-bold text-white">Flight History</h2>

            {aircraft && (
              <p className="mt-1 text-sm text-slate-400">
                {aircraft.callsign || "-"} • {aircraft.icao24}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Close
          </button>
        </div>

        {loading ? (
          <Loading
            title="Loading Flight History"
            description="Fetching aircraft history..."
          />
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            No flight history found.
          </div>
        ) : (
          <div className="max-h-[600px] overflow-y-auto">
            <table className="min-w-full">
              <thead className="sticky top-0 bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-300">No</th>

                  <th className="px-4 py-3 text-left text-slate-300">
                    Timestamp
                  </th>

                  <th className="px-4 py-3 text-right text-slate-300">
                    Latitude
                  </th>

                  <th className="px-4 py-3 text-right text-slate-300">
                    Longitude
                  </th>

                  <th className="px-4 py-3 text-right text-slate-300">
                    Altitude
                  </th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800 hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-3 text-white">{index + 1}</td>

                    <td className="px-4 py-3 text-slate-300">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-300">
                      {Number(log.latitude).toFixed(5)}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-300">
                      {Number(log.longitude).toFixed(5)}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-300">
                      {Math.round(log.altitude)} m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

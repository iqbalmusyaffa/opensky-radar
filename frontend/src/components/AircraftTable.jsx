import { EyeIcon } from "@heroicons/react/24/outline";
import FollowButton from "./FollowButton";
export default function AircraftTable({
  aircraft,
  following = [],
  onFollow,
  onView,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
      <div className="border-b border-slate-700 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Live Aircraft</h2>
        <p className="text-sm text-slate-400">
          Realtime aircraft over Indonesia
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">ICAO24</th>
              <th className="px-4 py-3 text-left">Callsign</th>
              <th className="px-4 py-3 text-left">Country</th>
              <th className="px-4 py-3 text-right">Speed</th>
              <th className="px-4 py-3 text-right">Altitude</th>
              <th className="px-4 py-3 text-right">Latitude</th>
              <th className="px-4 py-3 text-right">Longitude</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {aircraft.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-slate-400">
                  Waiting aircraft data...
                </td>
              </tr>
            ) : (
              aircraft.map((item) => {
                const isFollowing = following.includes(item.icao24);

                return (
                  <tr
                    key={item.icao24}
                    className="border-b border-slate-800 hover:bg-slate-800/50"
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

                    <td className="px-4 py-3 text-right text-slate-200">
                      {item.velocity
                        ? `${Math.round(item.velocity * 3.6)} km/h`
                        : "-"}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-200">
                      {item.baro_altitude
                        ? `${Math.round(item.baro_altitude)} m`
                        : "-"}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-300">
                      {item.latitude?.toFixed(4)}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-300">
                      {item.longitude?.toFixed(4)}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onView(item)}
                          className="rounded-lg bg-slate-700 p-2 text-white transition hover:bg-slate-600"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>

                        <FollowButton
                          aircraft={item}
                          isFollowing={isFollowing}
                          onFollowSuccess={onFollow}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

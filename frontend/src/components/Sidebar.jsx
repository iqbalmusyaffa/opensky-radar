import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Logbook",
    path: "/logbook",
    icon: BookOpenIcon,
  },
  {
    name: "History",
    path: "/history",
    icon: ClockIcon,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <PaperAirplaneIcon className="h-10 w-10 text-blue-500" />

          <div>
            <h1 className="text-lg font-bold text-white">
              Virtual Radar
            </h1>

            <p className="text-sm text-slate-400">
              Flight Logbook
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{menu.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="rounded-lg bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Status
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>

            <span className="text-sm text-white">
              WebSocket Connected
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
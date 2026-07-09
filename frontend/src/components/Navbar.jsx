import { Link, NavLink } from "react-router-dom";
import {
    HomeIcon,
    BookOpenIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/40 backdrop-blur-xl shadow-lg">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <PaperAirplaneIcon className="h-8 w-8 text-blue-500" />

                    <div>
                        <h1 className="text-lg font-bold text-white">
                            Virtual Radar
                        </h1>

                        <p className="text-xs text-slate-400">
                            Flight Logbook
                        </p>
                    </div>
                </Link>

                {/* Menu */}
                <div className="flex items-center gap-2">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-4 py-2 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <HomeIcon className="h-5 w-5" />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/logbook"
                        className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-4 py-2 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            }`
                        }
                    >
                        <BookOpenIcon className="h-5 w-5" />
                        Logbook
                    </NavLink>

                </div>

            </div>
        </nav>
    );
}
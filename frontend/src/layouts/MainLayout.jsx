import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen text-slate-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Content */}
            <div className="flex flex-1 flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Page */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}
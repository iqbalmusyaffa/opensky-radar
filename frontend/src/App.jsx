import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Logbook from "./pages/Logbook";
import History from "./pages/History";

function App() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/logbook"
                    element={<Logbook />}
                />

                <Route
                    path="/history/:icao24"
                    element={<History />}
                />

            </Route>

        </Routes>
    );
}

export default App;
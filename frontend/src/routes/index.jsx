import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Logbook from "../pages/Logbook";
import History from "../pages/History";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "logbook",
                element: <Logbook />,
            },
            {
                path: "history/:icao24",
                element: <History />,
            },
        ],
    },
]);

export default router;
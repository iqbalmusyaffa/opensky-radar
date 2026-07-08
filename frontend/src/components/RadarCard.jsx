import {
    PaperAirplaneIcon,
    BookmarkIcon,
    ClipboardDocumentListIcon,
    SignalIcon,
} from "@heroicons/react/24/outline";

const icons = {
    aircraft: PaperAirplaneIcon,
    follow: BookmarkIcon,
    logs: ClipboardDocumentListIcon,
    status: SignalIcon,
};

export default function RadarCard({
    title,
    value,
    icon,
    color = "blue",
}) {
    const Icon = icons[icon];

    const colors = {
        blue: "bg-blue-500/20 text-blue-400",
        emerald: "bg-emerald-500/20 text-emerald-400",
        amber: "bg-amber-500/20 text-amber-400",
        red: "bg-red-500/20 text-red-400",
    };

    return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-lg">
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        {value}
                    </h2>
                </div>

                <div
                    className={`rounded-xl p-3 ${colors[color]}`}
                >
                    {Icon && (
                        <Icon className="h-7 w-7" />
                    )}
                </div>

            </div>
        </div>
    );
}
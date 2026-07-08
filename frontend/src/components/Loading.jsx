export default function Loading({
    title = "Loading...",
    description = "Please wait a moment.",
}) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500"></div>

            <h2 className="mt-6 text-xl font-semibold text-white">
                {title}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
                {description}
            </p>
        </div>
    );
}
import { followAircraft } from "../api/radarApi";

export default function FollowButton({
    aircraft,
    isFollowing,
    onFollowSuccess,
}) {
    const handleFollow = async () => {
        if (isFollowing) return;

        try {
            const response = await followAircraft(aircraft);

            if (response.success) {
                onFollowSuccess(aircraft.icao24);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to follow aircraft.");
        }
    };

    return (
        <button
            onClick={handleFollow}
            disabled={isFollowing}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                isFollowing
                    ? "cursor-not-allowed bg-emerald-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}
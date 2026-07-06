import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import TimelineCard from "../components/timeline/TimelineCard";

export default function Timeline() {

  // Logged-in user
  const user = JSON.parse(
    localStorage.getItem("bizbrain_user")
  );

  // Unique history key for each user
  const historyKey = user
    ? `bizbrain_history_${user.email}`
    : "bizbrain_history_guest";

  const history = JSON.parse(
    localStorage.getItem(historyKey) || "[]"
  );

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-6xl mx-auto p-8">

          <h1 className="text-4xl font-bold">
            Business Timeline
          </h1>

          <p className="text-gray-400 mt-2 mb-8">
            Complete history of your business activities.
          </p>

          {history.length === 0 ? (
            <div className="bg-slate-900 rounded-xl p-8 text-center">
              No business activity yet.
            </div>
          ) : (
            history.map((event) => (
              <TimelineCard
                key={event.id}
                event={event}
              />
            ))
          )}

        </div>

      </div>

    </div>
  );
}
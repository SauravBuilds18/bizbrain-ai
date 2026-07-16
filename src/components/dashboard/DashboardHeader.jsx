import { CalendarDays, Bell, Search,CalendarRange,
  RotateCcw,} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

export default function DashboardHeader({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {
  const selectedDateObject = selectedDate
  ? new Date(selectedDate)
  : new Date();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          👋 Welcome Back
        </h1>

        <p className="text-slate-400 mt-2">
          Smarter Decisions. Better Business.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">

          <Search size={18} />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none w-48"
          />

        </div>

        <div className="flex flex-wrap gap-3 items-center">

  <button
    onClick={() => setFilterType("today")}
    className={`px-4 py-2 rounded-xl ${
      filterType === "today"
        ? "bg-blue-600"
        : "bg-slate-900 hover:bg-slate-800"
    }`}
  >
    Today
  </button>

  <button
    onClick={() => setFilterType("yesterday")}
    className={`px-4 py-2 rounded-xl ${
      filterType === "yesterday"
        ? "bg-blue-600"
        : "bg-slate-900 hover:bg-slate-800"
    }`}
  >
    Yesterday
  </button>

  <button
    onClick={() => setFilterType("week")}
    className={`px-4 py-2 rounded-xl ${
      filterType === "week"
        ? "bg-blue-600"
        : "bg-slate-900 hover:bg-slate-800"
    }`}
  >
    Last 7 Days
  </button>

  <button
    onClick={() => setFilterType("month")}
    className={`px-4 py-2 rounded-xl ${
      filterType === "month"
        ? "bg-blue-600"
        : "bg-slate-900 hover:bg-slate-800"
    }`}
  >
    This Month
  </button>

  <button
    onClick={() => setFilterType("year")}
    className={`px-4 py-2 rounded-xl ${
      filterType === "year"
        ? "bg-blue-600"
        : "bg-slate-900 hover:bg-slate-800"
    }`}
  >
    This Year
  </button>
<div className="flex items-center gap-3 mt-4 flex-wrap">

  <CalendarRange
    className="text-blue-400"
    size={20}
  />

  <DatePicker
    selected={new Date(fromDate)}
    onChange={(date) => {
      setFromDate(date.toISOString().split("T")[0]);
      setFilterType("range");
    }}
    dateFormat="dd MMM yyyy"
    className="bg-slate-900 rounded-xl px-3 py-2 border border-slate-700"
  />

  <span>to</span>

  <DatePicker
    selected={new Date(toDate)}
    onChange={(date) => {
      setToDate(date.toISOString().split("T")[0]);
      setFilterType("range");
    }}
    dateFormat="dd MMM yyyy"
    className="bg-slate-900 rounded-xl px-3 py-2 border border-slate-700"
  />

  <button
    onClick={() => setFilterType("range")}
    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
  >
    Apply
  </button>

  <button
    onClick={() => {

      const today = new Date()
        .toISOString()
        .split("T")[0];

      setFromDate(today);

      setToDate(today);

      setSelectedDate(today);

      setFilterType("today");

    }}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl flex items-center gap-2"
  >

    <RotateCcw size={16} />

    Reset

  </button>

</div>
</div>

      </div>

    </div>
  );
}
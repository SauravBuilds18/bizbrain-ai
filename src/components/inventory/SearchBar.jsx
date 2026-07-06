import { Search } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8">

      <div className="grid md:grid-cols-2 gap-5">

        {/* Search */}

        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-blue-500"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Medicine">Medicine</option>
          <option value="Electronics">Electronics</option>
          <option value="Grocery">Grocery</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

      </div>

    </div>
  );
}
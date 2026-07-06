import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-slate-900/80
        border
        border-slate-800
        backdrop-blur-md
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500
        hover:shadow-xl
        hover:shadow-blue-500/20
      "
    >
      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            ${color}
            bg-opacity-20
          `}
        >
          <Icon size={28} />
        </div>

      </div>

      <div className="flex items-center gap-2 mt-8">

        <ArrowUpRight
          size={16}
          className="text-green-400"
        />

        <span className="text-green-400 text-sm font-semibold">
          {change}
        </span>

      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

    </div>
  );
}
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  subtitle,
  positive = true,
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
        cursor-pointer
      "
    >
      {/* Background Glow */}

      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-400 text-sm tracking-wide">

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
            bg-slate-800
          `}
        >

          <Icon size={28} />

        </div>

      </div>

      {/* Comparison */}

      <div className="mt-8 flex items-center gap-2">

        {positive ? (

          <ArrowUpRight
            size={18}
            className="text-green-400"
          />

        ) : (

          <ArrowDownRight
            size={18}
            className="text-red-400"
          />

        )}

        <span
          className={`font-semibold ${
            positive
              ? "text-green-400"
              : "text-red-400"
          }`}
        >

          {change}

        </span>

      </div>

      {/* Subtitle */}

    <div className="mt-2">
  {typeof subtitle === "string" ? (
    <p className="text-xs text-slate-500">
      {subtitle}
    </p>
  ) : (
    subtitle
  )}
</div>

    </div>
  );
}
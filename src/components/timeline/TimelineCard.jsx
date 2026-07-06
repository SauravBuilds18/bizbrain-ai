import { Clock3 } from "lucide-react";

export default function TimelineCard({ event }) {

  return (

    <div className="bg-slate-900 rounded-xl p-6 mb-5 border border-slate-800">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            {event.title}
          </h2>

          <p className="text-gray-400 mt-1">
            {event.description}
          </p>

        </div>

        <div className="text-right">

          <h3 className="text-green-400 font-bold">
            ₹{event.amount}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-gray-400">

            <Clock3 size={16}/>

            <span>
              {event.time}
            </span>

          </div>

        </div>

      </div>

      <div className="mt-4 text-sm text-gray-500">

        {event.date}

      </div>

    </div>

  );

}
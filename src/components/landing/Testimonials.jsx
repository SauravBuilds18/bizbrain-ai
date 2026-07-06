import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Medical Store Owner",
    review:
      "BizBrain AI helped me manage inventory and increased my monthly profit by nearly 20%.",
  },
  {
    name: "Priya Gupta",
    role: "Electronics Shop",
    review:
      "The AI CEO is like having a business consultant available 24/7. It recommends exactly what I should restock.",
  },
  {
    name: "Amit Verma",
    role: "Supermarket Owner",
    review:
      "Invoice generation is incredibly fast and the dashboard gives me everything I need in one place.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-slate-900">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black">
            Trusted by Businesses
          </h2>

          <p className="text-slate-400 text-xl mt-5">
            See what business owners say about BizBrain AI.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-blue-500 transition"
            >

              <div className="flex gap-1 text-yellow-400 mb-5">

                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>
                <Star fill="currentColor" size={20}/>

              </div>

              <p className="text-slate-300 leading-8">

                "{item.review}"

              </p>

              <div className="mt-8">

                <h3 className="font-bold text-xl">

                  {item.name}

                </h3>

                <p className="text-slate-500">

                  {item.role}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
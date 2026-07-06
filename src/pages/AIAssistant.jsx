import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Bot, Send } from "lucide-react";

import { askBusinessAI } from "../services/aiService";

import { useInventory } from "../context/InventoryContext";
import { useInvoices } from "../context/InvoiceContext";

export default function AIAssistant() {

  const { products } = useInventory();

  const { invoices } = useInvoices();

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Welcome to BizBrain AI CEO.\n\nI can analyze your inventory, invoices, revenue, profit and give business suggestions.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // ------------------------
  // Dashboard Calculations
  // ------------------------

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + invoice.grandTotal,
    0
  );

  const totalProfit = invoices.reduce(
    (sum, invoice) => sum + invoice.totalProfit,
    0
  );

  const lowStock = products.filter(
    (item) =>
      item.quantity <= (item.reorderLevel || 10)
  ).length;

  const businessHealth =
    lowStock === 0
      ? "Excellent"
      : lowStock <= 2
      ? "Good"
      : "Needs Attention";

  // ------------------------
  // Analyze Whole Business
  // ------------------------

  const analyzeBusiness = async () => {

    setLoading(true);

    try {

      const answer = await askBusinessAI(

        "Analyze my business completely. Explain revenue, profit, inventory health, risks, growth opportunities and recommendations.",

        {
          products,
          invoices,
        }

      );

      setMessages((prev) => [

        ...prev,

        {
          sender: "ai",
          text: answer,
        },

      ]);

    } catch (error) {

  console.error("AI Error:", error);

  setMessages((prev) => [

    ...prev,

    {
      sender: "ai",
      text:
        error.response?.data?.answer ||
        error.message ||
        "Unable to connect to AI.",
    },

  ]);

}

    setLoading(false);

  };

  // ------------------------
  // Ask AI
  // ------------------------

  const askAI = async () => {

    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [

      ...prev,

      {
        sender: "user",
        text: userQuestion,
      },

    ]);

    setQuestion("");

    setLoading(true);

    try {

      const answer = await askBusinessAI(

        userQuestion,

        {
          products,
          invoices,
        }

      );

      setMessages((prev) => [

        ...prev,

        {
          sender: "ai",
          text: answer,
        },

      ]);

    } catch (error) {

  console.error("AI Error:", error);

  setMessages((prev) => [

    ...prev,

    {
      sender: "ai",
      text:
        error.response?.data?.answer ||
        error.message ||
        "Unable to connect to AI.",
    },

  ]);

}

    setLoading(false);

  };

  // ------------------------
  // Quick Ask
  // ------------------------

  const quickAsk = async (prompt) => {

    setMessages((prev) => [

      ...prev,

      {
        sender: "user",
        text: prompt,
      },

    ]);

    setLoading(true);

    try {

      const answer = await askBusinessAI(

        prompt,

        {
          products,
          invoices,
        }

      );

      setMessages((prev) => [

        ...prev,

        {
          sender: "ai",
          text: answer,
        },

      ]);

    } catch (error) {

  console.error("AI Error:", error);

  setMessages((prev) => [

    ...prev,

    {
      sender: "ai",
      text:
        error.response?.data?.answer ||
        error.message ||
        "Unable to connect to AI.",
    },

  ]);

}

    setLoading(false);

  };

  

  return (
    <div className="flex bg-slate-950 min-h-screen text-white">

  <Sidebar />

  <div className="flex-1">

    <Navbar />

    <div className="p-8 max-w-7xl mx-auto">

      {/* Page Title */}

      <h1 className="text-4xl font-bold flex items-center gap-3 mb-8">

        <Bot size={38} />

        BizBrain AI CEO

      </h1>

      {/* CEO Dashboard */}

      <div className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 rounded-2xl p-8 mb-8 shadow-xl">

        <h2 className="text-3xl font-bold">

          🤖 Welcome to BizBrain AI CEO

        </h2>

        <p className="mt-2 text-blue-100">

          Your intelligent business operating assistant.

        </p>

        <div className="grid md:grid-cols-4 gap-5 mt-8">

          <div className="bg-black/20 rounded-xl p-5">

            <p className="text-blue-100 text-sm">

              Revenue

            </p>

            <h3 className="text-3xl font-bold">

              ₹{totalRevenue.toLocaleString()}

            </h3>

          </div>

          <div className="bg-black/20 rounded-xl p-5">

            <p className="text-blue-100 text-sm">

              Profit

            </p>

            <h3 className="text-3xl font-bold">

              ₹{totalProfit.toLocaleString()}

            </h3>

          </div>

          <div className="bg-black/20 rounded-xl p-5">

            <p className="text-blue-100 text-sm">

              Orders

            </p>

            <h3 className="text-3xl font-bold">

              {invoices.length}

            </h3>

          </div>

          <div className="bg-black/20 rounded-xl p-5">

            <p className="text-blue-100 text-sm">

              Business Health

            </p>

            <h3 className="text-3xl font-bold">

              {businessHealth}

            </h3>

          </div>

        </div>

      </div>

      {/* Analyze Button */}

      <button

        onClick={analyzeBusiness}

        className="bg-green-600 hover:bg-green-700 rounded-xl px-6 py-3 font-semibold mb-8"

      >

        📊 Analyze My Business

      </button>

      {/* Quick AI Buttons */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">

        <button

          onClick={() =>
            quickAsk("Analyze my complete business performance.")
          }

          className="bg-slate-900 hover:bg-blue-600 transition rounded-xl p-5"

        >

          📊

          <h3 className="font-bold mt-2">

            Business Analysis

          </h3>

        </button>

        <button

          onClick={() =>
            quickAsk("Which products should I restock?")
          }

          className="bg-slate-900 hover:bg-blue-600 transition rounded-xl p-5"

        >

          📦

          <h3 className="font-bold mt-2">

            Restock Products

          </h3>

        </button>

        <button

          onClick={() =>
            quickAsk("Which product earned highest profit?")
          }

          className="bg-slate-900 hover:bg-blue-600 transition rounded-xl p-5"

        >

          💰

          <h3 className="font-bold mt-2">

            Top Profit

          </h3>

        </button>

        <button

          onClick={() =>
            quickAsk("Give today's business report.")
          }

          className="bg-slate-900 hover:bg-blue-600 transition rounded-xl p-5"

        >

          📈

          <h3 className="font-bold mt-2">

            Today's Report

          </h3>

        </button>

        <button

          onClick={() =>
            quickAsk("How can I increase my business profit?")
          }

          className="bg-slate-900 hover:bg-blue-600 transition rounded-xl p-5"

        >

          🚀

          <h3 className="font-bold mt-2">

            Growth Ideas

          </h3>

        </button>

        <button

          onClick={() =>
            quickAsk("Show all business risks.")
          }

          className="bg-slate-900 hover:bg-blue-600 transition rounded-xl p-5"

        >

          ⚠️

          <h3 className="font-bold mt-2">

            Business Risks

          </h3>

        </button>

      </div>

      {/* Chat Box */}

      <div className="bg-slate-900 rounded-2xl h-[500px] p-6 overflow-y-auto border border-slate-800">

        {messages.map((msg, index) => (

          <div

            key={index}

            className={`mb-4 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}

          >

            <div

              className={`inline-block px-5 py-3 rounded-xl max-w-3xl whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}

            >

              {msg.text}

            </div>

          </div>

        ))}

        {loading && (

          <div className="text-gray-400 italic">

            🤖 BizBrain AI is analyzing your business...

          </div>

        )}

      </div>

      {/* Continue with Part 3 below */}
            {/* Chat Input */}

      <div className="flex gap-4 mt-6">

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askAI();
            }
          }}
          placeholder="Ask your AI CEO anything about your business..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
        />

        <button
          onClick={askAI}
          className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 transition"
        >
          <Send size={22} />
        </button>

      </div>

    </div>

  </div>

</div>

  );
}
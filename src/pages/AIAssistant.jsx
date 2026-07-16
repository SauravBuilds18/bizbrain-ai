import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import ExecutiveBrief from "../components/ai/ExecutiveBrief";
import {
  Bot,
  Send,
  Mic,
  Volume2,
  VolumeX,
  Languages,
} from "lucide-react";

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
const [executiveBrief, setExecutiveBrief] = useState("");
const [briefLoading, setBriefLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en-US");
const languageConfig = {
  "en-US": {
    speech: "en-US",
    prompt: "Respond only in English.",
  },
  "hi-IN": {
    speech: "hi-IN",
    prompt:
      "उत्तर केवल हिंदी में दें। सरल और पेशेवर भाषा का उपयोग करें।",
  },
};
const [listening, setListening] = useState(false);

const [speaking, setSpeaking] = useState(false);
const [speakingMessage, setSpeakingMessage] = useState(null);

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


const generateExecutiveBrief = async () => {

  setBriefLoading(true);

  try {

    const prompt = `
    ${languageConfig[language].prompt}
You are an experienced business consultant.

Analyze the following business and generate an Executive Business Brief.

Include:

1. Business Health Score (out of 100)
2. Revenue Summary
3. Profit Summary
4. Low Stock Warning
5. Top Performing Product
6. Business Risks
7. Growth Opportunities
8. 3 CEO Recommendations

Keep the response short, professional, and under 180 words.
`;

    const answer = await askBusinessAI(prompt, {
      products,
      invoices,
    });

    setExecutiveBrief(answer);

  } catch (err) {

    setExecutiveBrief(
      "Unable to generate AI Executive Brief."
    );

  }

  setBriefLoading(false);

};

  const analyzeBusiness = async () => {

    setLoading(true);

    try {

      const finalPrompt = `
${languageConfig[language].prompt}

Analyze my business completely.
Explain revenue, profit, inventory health,
risks, growth opportunities and recommendations.
`;

const answer = await askBusinessAI(
  finalPrompt,
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
const speakResponse = (text, index) => {

  // If this message is already speaking, stop it

  if (speakingMessage === index) {

    window.speechSynthesis.cancel();

    setSpeaking(false);

    setSpeakingMessage(null);

    return;

  }

  // Stop any previous speech

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = languageConfig[language].speech;

  speech.rate = 1;

  speech.pitch = 1;

  speech.onstart = () => {

    setSpeaking(true);

    setSpeakingMessage(index);

  };

  speech.onend = () => {

    setSpeaking(false);

    setSpeakingMessage(null);

  };

  window.speechSynthesis.speak(speech);

};
const startListening = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser doesn't support Speech Recognition.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = languageConfig[language].speech;

  recognition.continuous = false;

  recognition.interimResults = true;

  recognition.maxAlternatives = 1;

  setListening(true);

  recognition.onstart = () => {
    console.log("Listening...");
  };

  recognition.onresult = (event) => {

    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join("");

    setQuestion(transcript);

  };

  recognition.onerror = (event) => {

    console.error(event.error);

    setListening(false);

  };

  recognition.onend = () => {

    setListening(false);

  };

  recognition.start();

};

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

      const prompt = `
${languageConfig[language].prompt}

User Question:

${userQuestion}
`;

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

     const finalPrompt = `
${languageConfig[language].prompt}

${prompt}
`;

const answer = await askBusinessAI(
  finalPrompt,
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

 useEffect(() => {
  if (products.length || invoices.length) {
    generateExecutiveBrief();
  }
}, [products, invoices]);

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

      <ExecutiveBrief
  revenue={totalRevenue}
  profit={totalProfit}
  orders={invoices.length}
  lowStock={lowStock}
  businessHealth={businessHealth}
/>

<div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8">

  <h2 className="text-2xl font-bold mb-4">

    🤖 AI Executive Report

  </h2>

  {briefLoading ? (

    <p className="text-gray-400">

      Generating AI report...

    </p>

  ) : (

    <div className="whitespace-pre-wrap leading-8">

      {executiveBrief}

    </div>

  )}

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
  className={`inline-block px-6 py-4 rounded-2xl shadow-lg max-w-3xl whitespace-pre-wrap ${
    msg.sender === "user"
      ? "bg-gradient-to-r from-blue-600 to-cyan-500"
      : "bg-slate-800 border border-slate-700"
  }`}
>

  {msg.text}

  {msg.sender === "ai" && (
<button
  onClick={() => speakResponse(msg.text, index)}
  className="ml-3 mt-3 flex items-center gap-2 transition"
>

  {speakingMessage === index ? (

    <Volume2
      size={20}
      className="text-green-400 animate-pulse"
    />

  ) : (

    <VolumeX
      size={20}
      className="text-green-400"
    />

  )}

</button>

  )}

</div>

          </div>

        ))}

        {loading && (

          <div className="flex items-center gap-3 text-gray-300">

  <Bot className="animate-bounce text-blue-400" />

  <span>

    BizBrain AI is thinking...

  </span>

</div>

        )}

      </div>


      <div className="flex justify-between items-center mb-4">

  <div className="flex items-center gap-3">

    <Languages className="text-blue-400" />

    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2"
    >
      <option value="en-US">🇬🇧 English</option>
      <option value="hi-IN">🇮🇳 Hindi</option>
    </select>

  </div>

  {listening && (
    <div className="text-red-400 animate-pulse font-semibold">
      🎤 Listening...
    </div>
  )}

  {speaking && (
    <div className="text-green-400 animate-pulse font-semibold">
      🔊 Speaking...
    </div>
  )}

</div>

      {/* Continue with Part 3 below */}
            {/* Chat Input */}

      <div className="flex gap-3 mt-6">

  <input
    type="text"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") askAI();
    }}
    placeholder="Ask BizBrain AI anything..."
    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
  />

  {/* Microphone */}

  <button
    onClick={startListening}
    className={`px-5 rounded-xl transition ${
      listening
        ? "bg-red-600 animate-pulse"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >

    <Mic size={22} />

  </button>

  {/* Speaker Stop */}

  

  {/* Send */}

  <button
    onClick={askAI}
    className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
  >

    <Send size={22} />

  </button>

</div>

    </div>

  </div>

</div>

  );
}
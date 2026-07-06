import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ==========================
// HEALTH CHECK
// ==========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 BizBrain AI Backend Running",
    model: "gemini-2.0-flash",
  });
});

// ==========================
// AI ROUTE
// ==========================

app.post("/api/ask-ai", async (req, res) => {
  try {
    const {
      question,
      inventory = [],
      invoices = [],
    } = req.body;

    console.log("==================================");
    console.log("🤖 New AI Request");
    console.log("Question:", question);
    console.log("Products:", inventory.length);
    console.log("Invoices:", invoices.length);
    console.log("==================================");

    // ==========================
    // BUSINESS CALCULATIONS
    // ==========================

    const totalRevenue = invoices.reduce(
      (sum, inv) => sum + (inv.grandTotal || 0),
      0
    );

    const totalProfit = invoices.reduce(
      (sum, inv) => sum + (inv.totalProfit || 0),
      0
    );

    const totalOrders = invoices.length;

    const inventoryValue = inventory.reduce(
      (sum, item) =>
        sum + ((item.costPrice || 0) * (item.quantity || 0)),
      0
    );

    const lowStock = inventory.filter(
      (item) =>
        (item.quantity || 0) <= (item.reorderLevel || 10)
    );

    const outOfStock = inventory.filter(
      (item) => (item.quantity || 0) === 0
    );

    const averageOrder =
      totalOrders > 0
        ? (totalRevenue / totalOrders).toFixed(2)
        : 0;

    // ==========================
    // PROMPT
    // ==========================

    const prompt = `
You are BizBrain AI CEO.

You are an expert business consultant.

Analyze ONLY the data provided.

BUSINESS SUMMARY

Revenue: ₹${totalRevenue}

Profit: ₹${totalProfit}

Orders: ${totalOrders}

Average Order Value: ₹${averageOrder}

Inventory Value: ₹${inventoryValue}

Products: ${inventory.length}

Low Stock Products: ${lowStock.length}

Out Of Stock Products: ${outOfStock.length}

INVENTORY

${JSON.stringify(inventory, null, 2)}

INVOICES

${JSON.stringify(invoices, null, 2)}

USER QUESTION

${question}

Rules:

• Never invent products.

• Mention actual product names.

• Keep response under 180 words.

• Use bullet points.

Always include:

📊 Business Health

💰 Revenue

📈 Profit

📦 Inventory

⚠ Risks

🚀 Growth Opportunity

Finish with:

CEO Recommendation:
`;

    // ==========================
    // GEMINI REQUEST
    // ==========================
const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "system",
      content:
        "You are BizBrain AI CEO. You analyze business inventory, invoices, revenue and profit and give practical business advice."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  temperature: 0.5,
  max_tokens: 400,
});

const answer = completion.choices[0].message.content;

return res.json({
  success: true,
  answer,
});
    

    
  } catch (error) {
    console.error("==================================");
    console.error("❌ Gemini Error");
    console.error(error);
    console.error("==================================");

    return res.status(500).json({
      success: false,
      answer: "Unable to analyze business.",
    });
  }
});

// ==========================
// START SERVER
// ==========================

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("==================================");
  console.log("🚀 BizBrain AI Backend Running");
console.log(`🌍 http://127.0.0.1:${PORT}`);
console.log("🤖 Groq Model: llama-3.3-70b-versatile");
  console.log("==================================");
});
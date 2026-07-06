import axios from "axios";

const API = "https://bizbrain-backend-9j48.onrender.com/api/ask-ai";

export async function askBusinessAI(question, businessData) {
  const res = await axios.post(
    API,
    {
      question,
      inventory: businessData.products,
      invoices: businessData.invoices,
    },
    {
      timeout: 15000,
    }
  );

  return res.data.answer;
}
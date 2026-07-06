import axios from "axios";

const API = "http://localhost:8000/api/ask-ai";

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
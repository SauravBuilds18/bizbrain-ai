import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import DashboardInsights from "../components/dashboard/DashboardInsights";
import DashboardBottom from "../components/dashboard/DashboardBottom";

import { askBusinessAI } from "../services/aiService";

import { useInventory } from "../context/InventoryContext";
import { useInvoices } from "../context/InvoiceContext";

import {
  getInventoryValue,
  getInvoiceProfit,
  getTotalProducts,
  getLowStock,
  getCategories,
} from "../utils/businessMetrics";

import {
  getTotalRevenue,
  getTotalProfit,
  getTodayOrders,
  getAverageOrder,
} from "../utils/dashboardMetrics";

export default function Dashboard() {

  const { products } = useInventory();
  const { invoices } = useInvoices();

  // Dashboard Metrics
 
const totalRevenue = getTotalRevenue(invoices);
const totalProfit = getInvoiceProfit(invoices);
const inventoryValue = getInventoryValue(products);

const orders = getTodayOrders(invoices);
const averageOrder = getAverageOrder(invoices);

const totalProducts = getTotalProducts(products);
const lowStock = getLowStock(products);
const categories = getCategories(products);
  // Sales Chart
  const weeklySales = invoices.map((invoice) => ({
    name: invoice.invoiceNo,
    sales: invoice.grandTotal,
  }));

  // Top Products
  const topProducts = invoices
    .flatMap((invoice) => invoice.items)
    .map((item) => ({
      name: item.name,
      sales: item.total,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const [summary, setSummary] = useState(
    "Click Analyze to generate an AI business report."
  );

  const [loading, setLoading] = useState(false);

  const analyzeDashboard = async () => {

    setLoading(true);

    try {

      const answer = await askBusinessAI(

        "Analyze my business dashboard. Give revenue insights, profit suggestions, low stock alerts, best selling products and business recommendations.",

        {
          products,
          invoices,
        }

      );

      setSummary(answer);

    } catch {

      setSummary("Unable to analyze business.");

    }

    setLoading(false);

  };

  return (

    <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-black min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="max-w-7xl mx-auto p-8">

          <DashboardHeader />

        <DashboardStats
  revenue={totalRevenue}
  profit={totalProfit}
  products={orders}
  lowStock={lowStock}
/>

          <DashboardCharts
            weeklySales={weeklySales}
            topProducts={topProducts}
          />

          <DashboardInsights
  products={products}
  revenue={totalRevenue}
  profit={totalProfit}
/>

          <DashboardBottom
            summary={summary}
            loading={loading}
            onAnalyze={analyzeDashboard}
            products={products}
          />

        </main>

      </div>

    </div>

  );

}
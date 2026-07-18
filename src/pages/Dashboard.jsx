import { useState, useMemo } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import DashboardBottom from "../components/dashboard/DashboardBottom";
import {
  getPercentageChange,
  getTrend,
} from "../utils/businessComparison";
import { askBusinessAI } from "../services/aiService";

import { useInventory } from "../context/InventoryContext";
import { useInvoices } from "../context/InvoiceContext";
import { useDashboardFilter } from "../context/DashboardFilterContext";
import { getTopSellingProducts } from "../utils/topSellingProducts";
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
  
  // Dashboard Filters
const {
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  filteredInvoices,
  previousInvoices,
           } = useDashboardFilter();


  // Dashboard Metrics
 
const totalRevenue = getTotalRevenue(filteredInvoices);
const totalProfit = getInvoiceProfit(filteredInvoices);
const inventoryValue = getInventoryValue(products);

const orders = filteredInvoices.length;
const averageOrder = getAverageOrder(filteredInvoices);

const totalProducts = getTotalProducts(products);
const lowStock = getLowStock(products);
const categories = getCategories(products);
const topSellingProducts = getTopSellingProducts(filteredInvoices);
// =========================
// Previous Period Metrics
// =========================

const previousRevenue = getTotalRevenue(previousInvoices);

const previousProfit = getInvoiceProfit(previousInvoices);

const previousOrders = previousInvoices.length;

const previousAverageOrder =
  getAverageOrder(previousInvoices);

  // =========================
// Revenue Comparison
// =========================

const revenueChange =
  getPercentageChange(
    totalRevenue,
    previousRevenue
  );

const revenueTrend =
  getTrend(
    totalRevenue,
    previousRevenue
  );

  // =========================
// Profit Comparison
// =========================

const profitChange =
  getPercentageChange(
    totalProfit,
    previousProfit
  );

const profitTrend =
  getTrend(
    totalProfit,
    previousProfit
  );

  // =========================
// Orders Comparison
// =========================

const ordersChange =
  getPercentageChange(
    orders,
    previousOrders
  );

const ordersTrend =
  getTrend(
    orders,
    previousOrders
  );

  // =========================
// Average Order Comparison
// =========================

const averageOrderChange =
  getPercentageChange(
    averageOrder,
    previousAverageOrder
  );

const averageOrderTrend =
  getTrend(
    averageOrder,
    previousAverageOrder
  );


  // Sales Chart
 const weeklySales = filteredInvoices.map((invoice) => ({
  name: invoice.invoiceNo || invoice.invoice_number,
  sales: Number(invoice.grandTotal || 0),
  date: invoice.created_at || invoice.date,
}));

  // Top Products
 const topProducts = filteredInvoices
  .flatMap((invoice) => invoice.items || [])
  .map((item) => ({
    name: item.name || "Unknown Product",
    sales: Number(item.total || 0),
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
  invoices: filteredInvoices,
  revenue: totalRevenue,
  profit: totalProfit,
  inventoryValue,
  lowStock,
  orders,
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

          
<DashboardHeader
  filterType={filterType}
  setFilterType={setFilterType}
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  fromDate={fromDate}
  setFromDate={setFromDate}
  toDate={toDate}
  setToDate={setToDate}
/>

      <DashboardStats
  revenue={totalRevenue}
  revenueChange={revenueChange}
  revenueTrend={revenueTrend}

  profit={totalProfit}
  profitChange={profitChange}
  profitTrend={profitTrend}

  orders={orders}
  ordersChange={ordersChange}
  ordersTrend={ordersTrend}

  averageOrder={averageOrder}
  averageOrderChange={averageOrderChange}
  averageOrderTrend={averageOrderTrend}

  lowStock={lowStock}

  topSellingProducts={topSellingProducts}
/>

          <DashboardCharts
            weeklySales={weeklySales}
            topProducts={topProducts}
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
// Total Inventory Value
export function getInventoryValue(products) {
  return products.reduce(
    (sum, item) => sum + (item.costPrice || 0) * item.quantity,
    0
  );
}

// Total Products
export function getTotalProducts(products) {
  return products.length;
}

// Low Stock Count
export function getLowStock(products) {
  return products.filter(
    (item) => item.quantity <= (item.reorderLevel || 10)
  ).length;
}

// Categories Count
export function getCategories(products) {
  return [...new Set(products.map((p) => p.category))].length;
}

// Highest Value Product
export function getHighestProduct(products) {
  if (!products.length) return null;

  return [...products].sort(
    (a, b) =>
      (b.costPrice || 0) * b.quantity -
      (a.costPrice || 0) * a.quantity
  )[0];
}

// Business Health
export function getBusinessHealth(products, invoices = []) {

  let score = 100;

  // Out of Stock
  const outOfStock = products.filter(
    (p) => p.quantity === 0
  ).length;

  // Low Stock
  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity <= (p.reorderLevel || 10)
  ).length;

  // No Inventory
  if (products.length === 0) {
    score = 20;
  }

  // Stock Penalties
  score -= outOfStock * 15;
  score -= lowStock * 5;

  // No Sales Yet
  if (invoices.length === 0) {
    score -= 15;
  }

  // Clamp Score
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let status = "";
  let color = "";

  if (score >= 90) {
    status = "Excellent";
    color = "text-green-400";
  } else if (score >= 75) {
    status = "Good";
    color = "text-blue-400";
  } else if (score >= 50) {
    status = "Average";
    color = "text-yellow-400";
  } else {
    status = "Poor";
    color = "text-red-400";
  }

  return {
    score,
    status,
    color,
  };
}

// Business Risk
export function getRiskLevel(products) {
  const lowStock = getLowStock(products);

  if (lowStock === 0) return "LOW";
  if (lowStock <= 2) return "MEDIUM";

  return "HIGH";
}
// Total Revenue From Invoices
export function getTotalRevenue(invoices) {
  return invoices.reduce(
    (sum, invoice) => sum + invoice.grandTotal,
    0
  );
}

// Total Profit From Invoices
export function getInvoiceProfit(invoices) {
  return invoices.reduce(
    (sum, invoice) => sum + invoice.totalProfit,
    0
  );
}

// Today's Revenue
export function getTodayRevenue(invoices) {
  const today = new Date().toLocaleDateString();

  return invoices
    .filter((invoice) => invoice.date === today)
    .reduce(
      (sum, invoice) => sum + invoice.grandTotal,
      0
    );
}

// Today's Profit
export function getTodayProfit(invoices) {
  const today = new Date().toLocaleDateString();

  return invoices
    .filter((invoice) => invoice.date === today)
    .reduce(
      (sum, invoice) => sum + invoice.totalProfit,
      0
    );
}
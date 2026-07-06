export const getTotalRevenue = (invoices) => {
  return invoices.reduce(
    (sum, invoice) => sum + invoice.grandTotal,
    0
  );
};

export const getTotalProfit = (invoices) => {
  return invoices.reduce(
    (sum, invoice) => sum + invoice.totalProfit,
    0
  );
};

export const getTodayOrders = (invoices) => {
  return invoices.length;
};

export const getAverageOrder = (invoices) => {
  if (invoices.length === 0) return 0;

  return (
    invoices.reduce(
      (sum, invoice) => sum + invoice.grandTotal,
      0
    ) / invoices.length
  );
};
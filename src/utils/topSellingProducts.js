export function getTopSellingProducts(invoices, limit = 3) {
  const productMap = {};
  let totalQuantity = 0;

  invoices.forEach((invoice) => {
    invoice.items.forEach((item) => {
      if (!productMap[item.name]) {
        productMap[item.name] = {
          name: item.name,
          quantity: 0,
        };
      }

      productMap[item.name].quantity += item.quantity;
      totalQuantity += item.quantity;
    });
  });

  return Object.values(productMap)
    .map((product) => ({
      ...product,
      percentage:
        totalQuantity === 0
          ? 0
          : (
              (product.quantity / totalQuantity) *
              100
            ).toFixed(1),
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}
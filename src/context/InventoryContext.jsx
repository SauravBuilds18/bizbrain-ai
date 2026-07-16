import { createContext, useContext, useEffect, useState } from "react";
import inventoryData from "../data/inventoryData";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {

  // Logged-in user
  const user = JSON.parse(
    localStorage.getItem("bizbrain_user")
  );

  // Unique inventory key for each user
  const inventoryKey = user
    ? `bizbrain_inventory_${user.email}`
    : "bizbrain_inventory_guest";

  // Load inventory
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(inventoryKey);

    return saved ? JSON.parse(saved) : inventoryData;
  });

  // Save inventory
  useEffect(() => {
    localStorage.setItem(
      inventoryKey,
      JSON.stringify(products)
    );
  }, [products, inventoryKey]);

  // Add Product
  const addProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  // Delete Product
  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Update Product
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id
          ? updatedProduct
          : item
      )
    );
  };

  // Sell Product
  const sellProduct = (productId, quantitySold) => {
    setProducts((prev) =>
      prev.map((item) => {

        if (item.id !== productId) return item;

        return {
          ...item,
          quantity: Math.max(
            0,
            item.quantity - quantitySold
          ),
        };

      })
    );
  };

  // Restock Product
  const restockProduct = (productId, quantityAdded) => {
    setProducts((prev) =>
      prev.map((item) => {

        if (item.id !== productId) return item;

        return {
          ...item,
          quantity: item.quantity + quantityAdded,
        };

      })
    );
  };

  // Find Product
  const getProductById = (id) =>
    products.find((item) => item.id === id);

  // Clear Inventory
  const clearInventory = () => {
    setProducts([]);
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        sellProduct,
        restockProduct,
        getProductById,
        clearInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
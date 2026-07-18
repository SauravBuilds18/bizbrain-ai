import { createContext, useContext, useEffect, useState } from "react";
import {
  getInvoices,
  createInvoice,
} from "../services/invoiceService";
// import inventoryData from "../data/inventoryData";
import { supabase } from "../lib/supabase";
import { getCurrentUser } from "../services/authService";
const InventoryContext = createContext();

export function InventoryProvider({ children }) {
const [products, setProducts] = useState([]);
  // Logged-in user
  useEffect(() => {
  fetchProducts();
}, []);

async function fetchProducts() {

  const user = await getCurrentUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return;
  }

  setProducts(
  (data || []).map((item) => ({
    ...item,
    costPrice: Number(item.cost_price),
    reorderLevel: item.reorder_level,
    expiryDate: item.expiry_date,
    warrantyMonths: item.warranty_months,
  }))
);
}
  // Add Product
const addProduct = async (product) => {

  const user = await getCurrentUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("inventory")
    .insert([
      {
        user_id: user.id,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        cost_price: product.costPrice,
        supplier: product.supplier,
        reorder_level: product.reorderLevel,
        expiry_date: product.expiryDate || null,
        warranty_months: product.warrantyMonths || null,
        notes: product.notes,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    return;
  }

  setProducts((prev) => [
  {
    ...data[0],
    costPrice: Number(data[0].cost_price),
    reorderLevel: data[0].reorder_level,
    expiryDate: data[0].expiry_date,
    warrantyMonths: data[0].warranty_months,
  },
  ...prev,
]);
};

  // Delete Product
 const deleteProduct = async (id) => {

  const { error } = await supabase
    .from("inventory")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  setProducts((prev) =>
    prev.filter((item) => item.id !== id)
  );
};

  // Update Product
  const updateProduct = async (product) => {

  const { data, error } = await supabase
    .from("inventory")
    .update({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      cost_price: product.costPrice,
      supplier: product.supplier,
      reorder_level: product.reorderLevel,
      expiry_date: product.expiryDate || null,
      warranty_months: product.warrantyMonths || null,
      notes: product.notes,
    })
    .eq("id", product.id)
    .select();

  if (error) {
    console.log(error);
    return;
  }

  setProducts((prev) =>
    prev.map((item) =>
      item.id === product.id
  ? {
      ...data[0],
      costPrice: Number(data[0].cost_price),
      reorderLevel: data[0].reorder_level,
      expiryDate: data[0].expiry_date,
      warrantyMonths: data[0].warranty_months,
    }
  : item
    )
  );
};

  // Sell Product
  const sellProduct = async (productId, quantitySold) => {

  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) return;

  const newQuantity = Math.max(
    0,
    product.quantity - quantitySold
  );

  const { error } = await supabase
    .from("inventory")
    .update({
      quantity: newQuantity,
    })
    .eq("id", productId);

  if (error) {
    console.log(error);
    return;
  }

  setProducts((prev) =>
    prev.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    )
  );
};

  // Restock Product
 const restockProduct = async (
  productId,
  quantityAdded
) => {

  const product = products.find(
    (p) => p.id === productId
  );

  if (!product) return;

  const newQuantity =
    product.quantity + quantityAdded;

  const { error } = await supabase
    .from("inventory")
    .update({
      quantity: newQuantity,
    })
    .eq("id", productId);

  if (error) {
    console.log(error);
    return;
  }

  setProducts((prev) =>
    prev.map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity: newQuantity,
          }
        : item
    )
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

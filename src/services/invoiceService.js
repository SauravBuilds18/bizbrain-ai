import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getInvoices() {

  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("invoices")
    .select(`
      *,
      invoice_items(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function createInvoice(invoice) {
  const user = await getCurrentUser();
  if (!user) return null;

const { data, error } = await supabase
  .from("invoices")
  .insert({
    user_id: user.id,

    invoice_number: invoice.invoiceNo,

    customer_name: invoice.customer.name,
    customer_phone: invoice.customer.phone,
    payment_method: invoice.customer.paymentMode,

    subtotal: invoice.subtotal,
    discount: invoice.discount,
    taxable_amount: invoice.taxableAmount,

    cgst: invoice.cgst,
    sgst: invoice.sgst,
    gst: invoice.gst,

    grand_total: invoice.grandTotal,
    total_profit: invoice.totalProfit,
  })
  .select()
  .single();

if (error) {
  console.error(error);
  return null;
}
return data;

}
export async function createInvoiceItems(invoiceId, items) {

  const user = await getCurrentUser();

  if (!user) return false;

  const invoiceItems = items.map((item) => ({
  invoice_id: invoiceId,
  user_id: user.id,

  product_id: item.productId,
  product_name: item.name,      // NEW

  quantity: item.quantity,
  price: item.sellingPrice,

  profit:
    (item.sellingPrice - item.costPrice) *
    item.quantity,
}));

  const { error } = await supabase
    .from("invoice_items")
    .insert(invoiceItems);

    
  if (error) {
    console.error(error);
    return false;
  }

  return true;
}
export async function deleteInvoiceById(id) {
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import companyInfo from "../config/companyInfo";

export function downloadInvoicePDF(invoice) {
  const doc = new jsPDF();

  // ===========================
  // Watermark
  // ===========================

  doc.setFontSize(40);
  doc.setTextColor(245);

  doc.text("BizBrain AI", 40, 170, {
    angle: 45,
  });

  // ===========================
  // Company Header
  // ===========================

  doc.setFontSize(24);
  doc.setTextColor(37, 99, 235);

  doc.text(companyInfo.companyName, 14, 18);

  doc.setFontSize(11);
  doc.setTextColor(90);

  doc.text(companyInfo.address, 14, 28);

  doc.text(`Phone : ${companyInfo.phone}`, 14, 36);

  doc.text(`Email : ${companyInfo.email}`, 14, 44);

  doc.text(`GST : ${companyInfo.gst}`, 14, 52);

  // Divider
  doc.setDrawColor(180);
  doc.line(14, 58, 195, 58);

  // ===========================
  // Invoice Details
  // ===========================

  doc.setFontSize(11);
  doc.setTextColor(50);

  doc.text(`Invoice No : ${invoice.invoiceNo}`, 135, 20);

  doc.text(`Date : ${invoice.date}`, 135, 28);

  doc.text(`Time : ${invoice.time}`, 135, 36);

  doc.text(`Customer : ${invoice.customer.name}`, 135, 44);

  doc.text(
    `Payment : ${invoice.customer.paymentMode}`,
    135,
    52
  );

  // ===========================
  // Product Table
  // ===========================

  autoTable(doc, {
    startY: 68,

    head: [[
      "Product",
      "Qty",
      "Cost Price",
      "Selling Price",
      "Total",
    ]],

    body: invoice.items.map((item) => [
      item.name,
      item.quantity,
      `₹${item.costPrice}`,
      `₹${item.sellingPrice}`,
      `₹${item.total}`,
    ]),

    headStyles: {
      fillColor: [37, 99, 235],
    },

    styles: {
      halign: "center",
    },
  });

  let y = doc.lastAutoTable.finalY + 15;

  // ===========================
  // Summary
  // ===========================

  doc.setTextColor(0);

  doc.setFontSize(12);

  doc.text(
    `Subtotal : ₹${invoice.subtotal.toFixed(2)}`,
    14,
    y
  );

  y += 8;

  doc.text(
  `Discount (${invoice.discountPercent || 0}%): -₹${invoice.discount.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `Taxable Amount : ₹${invoice.taxableAmount.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `CGST (${invoice.cgstPercent || 0}%): ₹${invoice.cgst.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `SGST (${invoice.sgstPercent || 0}%): ₹${invoice.sgst.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `Total GST : ₹${invoice.gst.toFixed(2)}`,
  14,
  y
);

y += 8;

  doc.setTextColor(34, 197, 94);

  doc.text(
    `Profit : ₹${invoice.totalProfit}`,
    14,
    y
  );

  y += 15;

  // ===========================
  // Grand Total Box
  // ===========================

  doc.setFillColor(37, 99, 235);

  doc.roundedRect(
    12,
    y - 8,
    90,
    14,
    3,
    3,
    "F"
  );

  doc.setFontSize(14);

  doc.setTextColor(255);

  doc.text(
    `Grand Total : ₹${invoice.grandTotal.toFixed(2)}`,
    16,
    y + 2
  );

  // ===========================
  // Footer
  // ===========================

  y += 25;

  doc.setTextColor(34, 197, 94);

  doc.setFontSize(13);

  doc.text(
    companyInfo.thankYou,
    14,
    y
  );

  y += 10;

  doc.setFontSize(10);

  doc.setTextColor(120);

  doc.text(
    "Generated using BizBrain AI - Smart Business Operating System",
    14,
    y
  );

  y += 8;

  doc.text(
    `Website : ${companyInfo.website}`,
    14,
    y
  );

  // ===========================
  // Save PDF
  // ===========================

  doc.save(`${invoice.invoiceNo}.pdf`);
}
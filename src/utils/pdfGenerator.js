import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadInvoicePDF(invoice, businessProfile) {

  const user = JSON.parse(localStorage.getItem("bizbrain_user"));

  const settingsKey = user
    ? `bizbrain_settings_${user.email}`
    : "bizbrain_settings_guest";

  businessProfile =
    JSON.parse(localStorage.getItem(settingsKey)) || businessProfile;

  const doc = new jsPDF();

  // ===========================
  // Watermark
  // ===========================

  doc.setFontSize(40);
  doc.setTextColor(245);

  doc.text(businessProfile.companyName, 40, 170, {
    angle: 45,
  });

  // ===========================
  // Company Header
  // ===========================
// ===========================
// Company Logo
// ===========================

if (businessProfile.logo) {
  try {
    doc.addImage(
      businessProfile.logo,
      "PNG",
      14,
      10,
      24,
      24
    );
  } catch (error) {
    console.log("Logo not loaded", error);
  }
}
  doc.setFontSize(24);
  const color = businessProfile.primaryColor;

const r = parseInt(color.slice(1,3),16);

const g = parseInt(color.slice(3,5),16);

const b = parseInt(color.slice(5,7),16);

doc.setTextColor(r,g,b);

  doc.text(businessProfile.companyName, 44, 18);

  doc.setFontSize(11);
  doc.setTextColor(90);

  doc.text(businessProfile.address, 44, 28);

  doc.text(`Phone : ${businessProfile.phone}`, 44, 36);

  doc.text(`Email : ${businessProfile.email}`, 44, 44);

  doc.text(`GST : ${businessProfile.gstNumber}`, 44, 52);

  // Divider
  doc.setDrawColor(180);
  doc.line(14, 58, 195, 58);

  // ===========================
  // Invoice Details
  // ===========================

  doc.setFontSize(11);
  doc.setTextColor(50);

  doc.text(
  `Invoice No : ${businessProfile.invoicePrefix}-${invoice.invoiceNo}`,
  135,
  20
);

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
      `${businessProfile.currency}${Number(item.costPrice).toFixed(2)}`,
      `${businessProfile.currency}${Number(item.sellingPrice).toFixed(2)}`,
`${businessProfile.currency}${Number(item.total).toFixed(2)}`,
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
    `Subtotal : ${businessProfile.currency}${invoice.subtotal.toFixed(2)}`,
    14,
    y
  );

  y += 8;

  doc.text(
  `Discount (${invoice.discountPercent || 0}%): -${businessProfile.currency}${invoice.discount.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `Taxable Amount : ${businessProfile.currency}${invoice.taxableAmount.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `CGST (${invoice.cgstPercent || 0}%): ${businessProfile.currency}${invoice.cgst.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `SGST (${invoice.sgstPercent || 0}%): ${businessProfile.currency}${invoice.sgst.toFixed(2)}`,
  14,
  y
);

y += 8;

doc.text(
  `Total GST : ${businessProfile.currency}${invoice.gst.toFixed(2)}`,
  14,
  y
);

y += 8;

  doc.setTextColor(34, 197, 94);

  doc.text(
    `Profit : ${businessProfile.currency}${invoice.totalProfit.toFixed(2)}`,
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
    `Grand Total : ${businessProfile.currency}${invoice.grandTotal.toFixed(2)}`,
    16,
    y + 2
  );

  // ===========================
  // Footer
  // ===========================

  // ===========================
// Professional Footer
// ===========================

y += 20;

// Divider
doc.setDrawColor(180);
doc.line(14, y, 195, y);

y += 10;

// Terms & Conditions
doc.setFontSize(11);
doc.setTextColor(40);

doc.setFont(undefined, "bold");
doc.text("Terms & Conditions", 14, y);

doc.setFont(undefined, "normal");

y += 7;

const terms =
  businessProfile.terms ||
  "Goods once sold will not be returned.";

doc.text(terms, 14, y, {
  maxWidth: 180,
});

y += 15;

// Thank You Message
doc.setFont(undefined, "bold");
doc.setTextColor(34, 197, 94);

doc.text(
  businessProfile.footerMessage ||
    "Thank you for your purchase!",
  14,
  y
);

doc.setFont(undefined, "normal");

y += 10;

// Contact Details
doc.setFontSize(10);
doc.setTextColor(100);

doc.text(
  `Phone : ${businessProfile.phone}`,
  14,
  y
);

doc.text(
  `Email : ${businessProfile.email}`,
  70,
  y
);

y += 7;

doc.text(
  `Website : ${businessProfile.website}`,
  14,
  y
);

doc.text(
  `GST : ${businessProfile.gstNumber}`,
  120,
  y
);

y += 10;

// Powered By
doc.setFontSize(10);
doc.setTextColor(150);

doc.text(
  "Powered by BizBrain AI",
  14,
  y
);

  // ===========================
  // Save PDF
  // ===========================

  doc.save(`${invoice.invoiceNo}.pdf`);
}
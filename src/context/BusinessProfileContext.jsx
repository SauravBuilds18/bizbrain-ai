import { createContext, useContext, useState } from "react";

const BusinessProfileContext = createContext();

export function BusinessProfileProvider({ children }) {
  const [businessProfile, setBusinessProfile] = useState({
    // Business Details
    companyName: "BizBrain AI",
    ownerName: "Saurav",
    businessType: "General Store",

    // Contact
    phone: "+91 9876543210",
    alternatePhone: "",
    email: "support@bizbrainai.com",
    website: "www.bizbrainai.com",

    // Address
    address: "Greater Noida",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    country: "India",
    pincode: "",

    // Tax
    gstNumber: "09ABCDE1234F1Z5",
    panNumber: "",

    // Invoice
    invoicePrefix: "INV",
    cgst: 9,
    sgst: 9,
    currency: "₹",

    footerMessage:
      "Thank you for your purchase. We look forward to serving you again!",

    terms:
      "Goods once sold will not be returned.",

    // Branding
    logo: "",
    primaryColor: "#2563eb",
    invoiceTheme: "professional",
  });

  return (
    <BusinessProfileContext.Provider
      value={{
        businessProfile,
        setBusinessProfile,
      }}
    >
      {children}
    </BusinessProfileContext.Provider>
  );
}

export function useBusinessProfile() {
  return useContext(BusinessProfileContext);
}
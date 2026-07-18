import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { getBusinessProfile } from "../services/businessProfileService";
const BusinessProfileContext = createContext();

export function BusinessProfileProvider({ children }) {
const [businessProfile, setBusinessProfile] = useState(null);

useEffect(() => {
  loadProfile();
}, []);

async function loadProfile() {
  const profile = await getBusinessProfile();

  if (!profile) return;

  setBusinessProfile({
    companyName: profile.business_name || "",
    ownerName: profile.owner_name || "",
    businessType: profile.business_type || "",

    phone: profile.phone || "",
    alternatePhone: "",
    email: profile.email || "",
    website: profile.website || "",

    address: profile.address || "",
    city: profile.city || "",
    state: profile.state || "",
    country: profile.country || "",
    pincode: profile.pincode || "",

    gstNumber: profile.gst_number || "",
    panNumber: profile.pan_number || "",

    invoicePrefix: profile.invoice_prefix || "INV",

    cgst: profile.cgst || 9,
    sgst: profile.sgst || 9,

    currency: profile.currency || "INR",

    footerMessage:
      profile.footer ||
      "Thank you for your purchase.",

    terms: profile.terms || "",

    logo: profile.logo || "",

    primaryColor:
      profile.primary_color || "#2563EB",

    invoiceTheme:
      profile.invoice_theme || "professional",
  });
}

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
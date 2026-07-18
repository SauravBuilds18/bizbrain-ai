import { supabase } from "../lib/supabase";
import { getCurrentUser } from "./authService";

export async function getBusinessProfile() {
  const user = await getCurrentUser();

  if (!user) return null;

  // Try to load existing profile
  let { data, error } = await supabase
    .from("business_profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  // If profile doesn't exist, create one automatically
  if (!data) {
    const newProfile = {
      user_id: user.id,
      owner_name:
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email.split("@")[0],

      business_name: "",

      email: user.email,

      phone: "",

      gst_number: "",

      address: "",

      website: "",

      invoice_prefix: "INV",

      currency: "INR",

      primary_color: "#2563EB",

      footer: "Thank you for your business.",

      terms: "",
    };

    const { data: inserted, error: insertError } =
      await supabase
        .from("business_profiles")
        .insert(newProfile)
        .select()
        .single();

    if (insertError) {
      console.error(insertError);
      return null;
    }

    return inserted;
  }

  return data;
}

export async function updateBusinessProfile(profile) {
  const user = await getCurrentUser();

  if (!user) return;

  const { error } = await supabase
.from("business_profiles")
.update({

  business_name: profile.companyName,

  owner_name: profile.ownerName,

  phone: profile.phone,

  email: profile.email,

  website: profile.website,

  address: profile.address,

  gst_number: profile.gstNumber,

  invoice_prefix: profile.invoicePrefix,

  currency: profile.currency,

  footer: profile.footerMessage,

  terms: profile.terms,

  primary_color: profile.primaryColor,

  logo: profile.logo,

})
.eq("user_id", user.id);

  if (error) console.error(error);
}
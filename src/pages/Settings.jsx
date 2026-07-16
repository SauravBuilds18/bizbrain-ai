import { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useBusinessProfile } from "../context/BusinessProfileContext";

export default function Settings() {

  const {
    businessProfile,
    setBusinessProfile,
  } = useBusinessProfile();

  const user = JSON.parse(
    localStorage.getItem("bizbrain_user")
  );

  const settingsKey = user
    ? `bizbrain_settings_${user.email}`
    : "bizbrain_settings_guest";

  // Load Business Profile

  useEffect(() => {

    const saved = JSON.parse(
      localStorage.getItem(settingsKey)
    );

    if (saved) {
      setBusinessProfile(saved);
    }

  }, []);

  // Save

  const saveBusinessProfile = () => {

    localStorage.setItem(
      settingsKey,
      JSON.stringify(businessProfile)
    );

    alert("✅ Business Profile Updated Successfully!");

  };

  // Logo Upload

  const handleLogoUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setBusinessProfile({

        ...businessProfile,

        logo: reader.result,

      });

    };

    reader.readAsDataURL(file);

  };

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-7xl mx-auto p-8">

          <h1 className="text-4xl font-bold">

            ⚙ Business Profile

          </h1>

          <p className="text-slate-400 mt-2 mb-10">

            Configure your company information once.
            BizBrain AI will automatically use it
            throughout Dashboard, Invoice, PDF,
            Reports and AI Assistant.

          </p>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            {/* Logo */}

            <div className="mb-12">

              <h2 className="text-2xl font-bold mb-5">

                🏢 Company Branding

              </h2>

              <div className="flex items-center gap-8">

                <div>

                  {businessProfile.logo ? (

                    <img
                      src={businessProfile.logo}
                      alt="Logo"
                      className="w-28 h-28 rounded-2xl border border-slate-700 object-cover"
                    />

                  ) : (

                    <div className="w-28 h-28 rounded-2xl bg-slate-800 flex items-center justify-center">

                      No Logo

                    </div>

                  )}

                </div>

                <div>

                  <input

                    type="file"

                    accept="image/*"

                    onChange={handleLogoUpload}

                    className="mb-3"

                  />

                  <p className="text-slate-400 text-sm">

                    Upload PNG or JPG

                  </p>

                </div>

              </div>

            </div>

            {/* Business Information */}

            <h2 className="text-2xl font-bold mb-6">

              🏢 Business Information

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input

                placeholder="Company Name"

                value={businessProfile.companyName}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    companyName:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="Owner Name"

                value={businessProfile.ownerName}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    ownerName:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="Business Type"

                value={businessProfile.businessType}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    businessType:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="GST Number"

                value={businessProfile.gstNumber}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    gstNumber:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="PAN Number"

                value={businessProfile.panNumber}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    panNumber:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

            </div>

            {/* Contact Information */}

            <h2 className="text-2xl font-bold mt-12 mb-6">

              📞 Contact Information

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input

                placeholder="Phone Number"

                value={businessProfile.phone}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    phone:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="Alternate Phone"

                value={businessProfile.alternatePhone}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    alternatePhone:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="Email"

                value={businessProfile.email}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    email:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="Website"

                value={businessProfile.website}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    website:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />
                          </div>

            {/* Address Information */}

            <h2 className="text-2xl font-bold mt-12 mb-6">

              📍 Business Address

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <textarea

                rows={4}

                placeholder="Business Address"

                value={businessProfile.address}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    address:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4 md:col-span-2"

              />

              <input

                placeholder="City"

                value={businessProfile.city}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    city:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="State"

                value={businessProfile.state}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    state:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="Country"

                value={businessProfile.country}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    country:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                placeholder="PIN Code"

                value={businessProfile.pincode}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    pincode:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

            </div>

            {/* Invoice Settings */}

            <h2 className="text-2xl font-bold mt-12 mb-6">

              🧾 Invoice Settings

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input

                placeholder="Invoice Prefix"

                value={businessProfile.invoicePrefix}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    invoicePrefix:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <select

                value={businessProfile.currency}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    currency:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              >

                <option value="₹">

                  ₹ Indian Rupee

                </option>

                <option value="$">

                  $ Dollar

                </option>

                <option value="€">

                  € Euro

                </option>

                <option value="£">

                  £ Pound

                </option>

              </select>

              <input

                type="number"

                placeholder="CGST %"

                value={businessProfile.cgst}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    cgst:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

              <input

                type="number"

                placeholder="SGST %"

                value={businessProfile.sgst}

                onChange={(e)=>

                  setBusinessProfile({

                    ...businessProfile,

                    sgst:e.target.value,

                  })

                }

                className="bg-slate-800 rounded-xl p-4"

              />

            </div>

            {/* Branding */}

            <h2 className="text-2xl font-bold mt-12 mb-6">

              🎨 Branding

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block mb-3">

                  Primary Theme Color

                </label>

                <input

                  type="color"

                  value={businessProfile.primaryColor}

                  onChange={(e)=>

                    setBusinessProfile({

                      ...businessProfile,

                      primaryColor:e.target.value,

                    })

                  }

                  className="w-full h-14 rounded-xl"

                />

              </div>

              <div>

                <label className="block mb-3">

                  Invoice Theme

                </label>

                <select

                  value={businessProfile.invoiceTheme}

                  onChange={(e)=>

                    setBusinessProfile({

                      ...businessProfile,

                      invoiceTheme:e.target.value,

                    })

                  }

                  className="bg-slate-800 rounded-xl p-4 w-full"

                >

                  <option value="professional">

                    Professional

                  </option>

                  <option value="modern">

                    Modern

                  </option>

                  <option value="minimal">

                    Minimal

                  </option>

                </select>

              </div>

            </div>

            {/* Footer */}

            <h2 className="text-2xl font-bold mt-12 mb-6">

              📄 Invoice Footer

            </h2>

            <textarea

              rows={4}

              placeholder="Footer Message"

              value={businessProfile.footerMessage}

              onChange={(e)=>

                setBusinessProfile({

                  ...businessProfile,

                  footerMessage:e.target.value,

                })

              }

              className="bg-slate-800 rounded-xl p-4 w-full"

            />

            {/* Terms */}

            <h2 className="text-2xl font-bold mt-12 mb-6">

              📜 Terms & Conditions

            </h2>

            <textarea

              rows={5}

              placeholder="Terms & Conditions"

              value={businessProfile.terms}

              onChange={(e)=>

                setBusinessProfile({

                  ...businessProfile,

                  terms:e.target.value,

                })

              }

              className="bg-slate-800 rounded-xl p-4 w-full"

            />

            {/* Save */}

            <div className="flex justify-end mt-12">

              <button

                onClick={saveBusinessProfile}

                className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl text-lg font-semibold"

              >

                💾 Save Business Profile

              </button>

            </div>
                    {/* Live Invoice Preview */}

            <div className="mt-16 bg-slate-950 rounded-3xl border border-slate-700 p-10">

              <h2 className="text-3xl font-bold mb-8">

                👀 Live Invoice Preview

              </h2>

              <div className="bg-white rounded-2xl text-black p-10">

                {/* Header */}

                <div className="flex justify-between items-start border-b pb-6">

                  <div className="flex gap-6">

                    {businessProfile.logo ? (

                      <img
                        src={businessProfile.logo}
                        alt="Company Logo"
                        className="w-24 h-24 object-contain rounded-xl border"
                      />

                    ) : (

                      <div className="w-24 h-24 border rounded-xl flex items-center justify-center">

                        Logo

                      </div>

                    )}

                    <div>

                      <h1
                        className="text-3xl font-bold"
                        style={{
                          color:
                            businessProfile.primaryColor,
                        }}
                      >

                        {businessProfile.companyName ||
                          "Company Name"}

                      </h1>

                      <p className="mt-1">

                        Owner :

                        {" "}

                        {businessProfile.ownerName}

                      </p>

                      <p>

                        {businessProfile.businessType}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <h2 className="text-3xl font-bold">

                      TAX INVOICE

                    </h2>

                    <p>

                      Invoice :

                      {" "}

                      {businessProfile.invoicePrefix}-00001

                    </p>

                    <p>

                      Date :

                      {" "}

                      {new Date().toLocaleDateString()}

                    </p>

                  </div>

                </div>

                {/* Contact */}

                <div className="grid grid-cols-2 gap-10 mt-8">

                  <div>

                    <h3 className="font-bold mb-3">

                      Company Details

                    </h3>

                    <p>

                      GST :

                      {" "}

                      {businessProfile.gstNumber}

                    </p>

                    <p>

                      PAN :

                      {" "}

                      {businessProfile.panNumber}

                    </p>

                    <p>

                      Phone :

                      {" "}

                      {businessProfile.phone}

                    </p>

                    <p>

                      Email :

                      {" "}

                      {businessProfile.email}

                    </p>

                    <p>

                      Website :

                      {" "}

                      {businessProfile.website}

                    </p>

                  </div>

                  <div>

                    <h3 className="font-bold mb-3">

                      Address

                    </h3>

                    <p>

                      {businessProfile.address}

                    </p>

                    <p>

                      {businessProfile.city},

                      {" "}

                      {businessProfile.state}

                    </p>

                    <p>

                      {businessProfile.country}

                      {" "}

                      {businessProfile.pincode}

                    </p>

                  </div>

                </div>

                {/* Demo Invoice Table */}

                <table className="w-full mt-10 border">

                  <thead
                    style={{
                      background:
                        businessProfile.primaryColor,
                      color: "white",
                    }}
                  >

                    <tr>

                      <th className="p-3">

                        Product

                      </th>

                      <th>

                        Qty

                      </th>

                      <th>

                        Rate

                      </th>

                      <th>

                        Amount

                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr className="border-b">

                      <td className="p-3">

                        Sample Product

                      </td>

                      <td className="text-center">

                        2

                      </td>

                      <td className="text-center">

                        ₹500

                      </td>

                      <td className="text-center">

                        ₹1000

                      </td>

                    </tr>

                  </tbody>

                </table>

                {/* Totals */}

                <div className="flex justify-end mt-8">

                  <div className="w-80 space-y-2">

                    <div className="flex justify-between">

                      <span>

                        Subtotal

                      </span>

                      <span>

                        ₹1000

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>

                        CGST ({businessProfile.cgst}%)

                      </span>

                      <span>

                        ₹90

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>

                        SGST ({businessProfile.sgst}%)

                      </span>

                      <span>

                        ₹90

                      </span>

                    </div>

                    <hr />

                    <div
                      className="flex justify-between text-xl font-bold"
                      style={{
                        color:
                          businessProfile.primaryColor,
                      }}
                    >

                      <span>

                        Grand Total

                      </span>

                      <span>

                        ₹1180

                      </span>

                    </div>

                  </div>

                </div>

                {/* Footer */}

                <div className="border-t mt-10 pt-6">

                  <h3 className="font-bold">

                    Terms & Conditions

                  </h3>

                  <p className="text-sm mt-2">

                    {businessProfile.terms}

                  </p>

                  <h3 className="font-bold mt-6">

                    Message

                  </h3>

                  <p className="text-sm mt-2">

                    {businessProfile.footerMessage}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}    
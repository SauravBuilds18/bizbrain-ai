import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function Settings() {

  const [settings, setSettings] = useState({
    
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  gst: "",
  address: "",
  upi: "",
  footer: "Thank You For Shopping!",
  currency: "₹",
  logo: "",
});
const user = JSON.parse(
  localStorage.getItem("bizbrain_user")
);

const settingsKey = user
  ? `bizbrain_settings_${user.email}`
  : "bizbrain_settings_guest";

  useEffect(() => {

    const saved = JSON.parse(
  localStorage.getItem(settingsKey)
);

    if (saved) {
      setSettings(saved);
    }

  }, []);

  const saveSettings = () => {

    localStorage.setItem(
  settingsKey,
  JSON.stringify(settings)
);

    alert("Business profile updated successfully!");

  };

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="max-w-5xl mx-auto p-8">

          <h1 className="text-4xl font-bold">

            ⚙ Business Settings

          </h1>

          <p className="text-slate-400 mt-3 mb-10">

            Manage your business profile.

          </p>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">

<label className="block mb-3">

Business Logo

</label>

<input
type="file"
accept="image/*"
onChange={(e)=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=()=>{

setSettings({
...settings,
logo:reader.result,
});

};

reader.readAsDataURL(file);

}}
/>

</div>

              <input
                placeholder="Business Name"
                className="bg-slate-800 rounded-xl p-4"
                value={settings.businessName}
                onChange={(e)=>
                  setSettings({
                    ...settings,
                    businessName:e.target.value
                  })
                }
              />

              <input
                placeholder="Owner Name"
                className="bg-slate-800 rounded-xl p-4"
                value={settings.ownerName}
                onChange={(e)=>
                  setSettings({
                    ...settings,
                    ownerName:e.target.value
                  })
                }
              />

              <input
                placeholder="Email"
                className="bg-slate-800 rounded-xl p-4"
                value={settings.email}
                onChange={(e)=>
                  setSettings({
                    ...settings,
                    email:e.target.value
                  })
                }
              />

              <input
                placeholder="Phone"
                className="bg-slate-800 rounded-xl p-4"
                value={settings.phone}
                onChange={(e)=>
                  setSettings({
                    ...settings,
                    phone:e.target.value
                  })
                }
              />

              <input
                placeholder="GST Number"
                className="bg-slate-800 rounded-xl p-4"
                value={settings.gst}
                onChange={(e)=>
                  setSettings({
                    ...settings,
                    gst:e.target.value
                  })
                }
              />
              <select
className="bg-slate-800 rounded-xl p-4"
value={settings.currency}
onChange={(e)=>
setSettings({
...settings,
currency:e.target.value,
})
}
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

placeholder="UPI ID"

className="bg-slate-800 rounded-xl p-4"

value={settings.upi}

onChange={(e)=>

setSettings({

...settings,

upi:e.target.value

})

}

/>
<textarea

rows={3}

placeholder="Invoice Footer"

className="bg-slate-800 rounded-xl p-4 md:col-span-2"

value={settings.footer}

onChange={(e)=>

setSettings({

...settings,

footer:e.target.value

})

}

/>

              <textarea
                rows={4}
                placeholder="Business Address"
                className="bg-slate-800 rounded-xl p-4 md:col-span-2"
                value={settings.address}
                onChange={(e)=>
                  setSettings({
                    ...settings,
                    address:e.target.value
                  })
                }
              />

            </div>

            <button
              onClick={saveSettings}
              className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 py-4 mt-8"
            >

              Save Changes

            </button>
<div className="mt-12 bg-slate-800 rounded-2xl p-8">

<h2 className="text-2xl font-bold mb-6">

Invoice Preview

</h2>

{settings.logo && (

<img

src={settings.logo}

className="w-24 mb-6"

/>

)}

<h3 className="text-3xl font-bold">

{settings.businessName || "Your Business"}

</h3>

<p>

Owner :

{settings.ownerName}

</p>

<p>

GST :

{settings.gst}

</p>

<p>

Phone :

{settings.phone}

</p>

<p>

UPI :

{settings.upi}

</p>

<p>

Address :

{settings.address}

</p>

<hr className="my-5"/>

<p>

{settings.footer}

</p>

</div>
          </div>

        </div>

      </div>

    </div>

  );

}
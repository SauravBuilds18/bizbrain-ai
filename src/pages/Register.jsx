import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bot, User, Building2, Mail, Lock } from "lucide-react";
import { signUp } from "../services/authService";
import { supabase } from "../lib/supabase";
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

 const handleRegister = async (e) => {
  e.preventDefault();

  if (
    !form.businessName ||
    !form.ownerName ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const { data, error } = await signUp(
  form.email,
  form.password
);

if (error) {
  alert(error.message);
  return;
}

const user = data.user;

if (user) {

  // Create user profile
  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: form.ownerName,
    email: form.email,
    phone: "",
  });

  // Create business profile
  await supabase.from("business_profiles").upsert({
    user_id: user.id,
    business_name: form.businessName,
    owner_name: form.ownerName,
    email: form.email,
    phone: "",
    address: "",
    gst_number: "",
    website: "",
    invoice_prefix: "INV",
    currency: "INR",
    primary_color: "#2563EB",
    terms: "",
    footer: "Thank you for your purchase.",
  });

}

alert("Account created successfully!");

navigate("/dashboard");
};

  return (
    <div className="min-h-screen bg-slate-950 text-white grid lg:grid-cols-2">

      {/* Left */}

      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-blue-700 via-cyan-600 to-blue-500">

        <div className="flex items-center gap-4">

          <Bot size={60} />

          <h1 className="text-5xl font-black">
            BizBrain AI
          </h1>

        </div>

        <h2 className="text-5xl font-black mt-12">
          Create Your Account
        </h2>

        <p className="text-2xl mt-8 text-blue-100 leading-10">
          Start managing your business with AI-powered inventory,
          invoices, analytics and business insights.
        </p>

      </div>

      {/* Right */}

      <div className="flex justify-center items-center p-10">

        <form
          onSubmit={handleRegister}
          className="w-full max-w-lg bg-slate-900 rounded-3xl p-10 border border-slate-800"
        >

          <h2 className="text-4xl font-black">
            Create Account
          </h2>

          <p className="text-slate-400 mt-2">
            Join BizBrain AI today.
          </p>

          {/* Business */}

          <div className="mt-8">

            <label>Business Name</label>

            <div className="flex items-center bg-slate-800 rounded-xl mt-2 px-4">

              <Building2 className="text-slate-400" size={20} />

              <input
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Business Name"
                value={form.businessName}
                onChange={(e)=>
                  setForm({...form,businessName:e.target.value})
                }
              />

            </div>

          </div>

          {/* Owner */}

          <div className="mt-5">

            <label>Owner Name</label>

            <div className="flex items-center bg-slate-800 rounded-xl mt-2 px-4">

              <User className="text-slate-400" size={20}/>

              <input
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Owner Name"
                value={form.ownerName}
                onChange={(e)=>
                  setForm({...form,ownerName:e.target.value})
                }
              />

            </div>

          </div>

          {/* Email */}

          <div className="mt-5">

            <label>Email</label>

            <div className="flex items-center bg-slate-800 rounded-xl mt-2 px-4">

              <Mail className="text-slate-400" size={20}/>

              <input
                type="email"
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Email"
                value={form.email}
                onChange={(e)=>
                  setForm({...form,email:e.target.value})
                }
              />

            </div>

          </div>

          {/* Password */}

          <div className="mt-5">

            <label>Password</label>

            <div className="flex items-center bg-slate-800 rounded-xl mt-2 px-4">

              <Lock className="text-slate-400" size={20}/>

              <input
                type="password"
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Password"
                value={form.password}
                onChange={(e)=>
                  setForm({...form,password:e.target.value})
                }
              />

            </div>

          </div>

          {/* Confirm */}

          <div className="mt-5">

            <label>Confirm Password</label>

            <div className="flex items-center bg-slate-800 rounded-xl mt-2 px-4">

              <Lock className="text-slate-400" size={20}/>

              <input
                type="password"
                className="bg-transparent flex-1 p-4 outline-none"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e)=>
                  setForm({...form,confirmPassword:e.target.value})
                }
              />

            </div>

          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 mt-8 font-bold">

            Create Account

          </button>

          <p className="text-center mt-8 text-slate-400">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-400 ml-2"
            >

              Login

            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}
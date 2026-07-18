import { Bell, Search, Settings, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { useBusinessProfile } from "../../context/BusinessProfileContext";
export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { user } = useAuth();

const { businessProfile } = useBusinessProfile();

  const logout = async () => {

  await supabase.auth.signOut();

  navigate("/login");

};

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);


  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          placeholder="Search..."
          className="pl-12 pr-4 py-3 rounded-xl bg-slate-800 w-96 outline-none"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        {/* Profile */}

        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 hover:bg-slate-800 px-3 py-2 rounded-xl transition"
          >

            {businessProfile?.logo ? (

              <img
                src={businessProfile.logo}
                alt="Business Logo"
                className="w-11 h-11 rounded-full object-cover border border-slate-700"
              />

            ) : (

              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">

                {(businessProfile?.owner_name || user?.email)
  ?.charAt(0)
  .toUpperCase().toUpperCase() || "U"}

              </div>

            )}

            <div className="text-left">

              <h3 className="font-semibold">

                {businessProfile?.owner_name || user?.email}

              </h3>

              <p className="text-xs text-gray-400">

                {businessProfile?.business_name || "Complete Business Profile"}

              </p>

            </div>

            <ChevronDown size={18} />

          </button>

          {/* Dropdown */}

          {open && (

            <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50">

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-800 transition"
              >

                <Settings size={18} />

                Settings

              </button>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/10 transition"
              >

                <LogOut size={18} />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}
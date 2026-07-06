import { Link, useLocation } from "react-router-dom";
import { History } from "lucide-react";
import { CalendarDays } from "lucide-react";
import {
  LayoutDashboard,
  Boxes,
  FileText,
  Users,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Inventory",
    icon: Boxes,
    path: "/inventory",
  },
  {
    title: "Invoices",
    icon: FileText,
    path: "/invoices",
  },
  
  {
    title: "AI Assistant",
    icon: Bot,
    path: "/ai",
  },
  
    
  {
  title: "Timeline",
  icon: History,
  path: "/timeline",
},
{
   title:"Calendar",
   icon: CalendarDays,
   path:"/calendar"
},
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },

];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-blue-500">
          BizBrain AI
        </h1>

        <p className="text-slate-400 mt-2">
          Smart Business OS
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 transition-all duration-300 hover:bg-slate-800 ${
                location.pathname === item.path
                  ? "bg-slate-800 text-blue-400 border-r-4 border-blue-500"
                  : "text-slate-300"
              }`}
            >
              <Icon size={22} />
              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}
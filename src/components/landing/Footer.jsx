import { Bot, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <Bot className="text-blue-500" size={36} />

              <h2 className="text-3xl font-black">

                BizBrain AI

              </h2>

            </div>

            <p className="text-slate-400 mt-6 leading-8">

              AI-powered Business Operating System for Inventory,
              Billing, Analytics and Smart Decision Making.

            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Product

            </h3>

            <div className="space-y-4 text-slate-400">

              <p>Dashboard</p>

              <p>Inventory</p>

              <p>Invoices</p>

              <p>AI CEO</p>

              <p>Calendar</p>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Company

            </h3>

            <div className="space-y-4 text-slate-400">

              <p>About</p>

              <p>Features</p>

              <p>Contact</p>

              <p>Privacy Policy</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Contact

            </h3>

            <div className="space-y-5 text-slate-400">

              <div className="flex gap-3">

                <Mail size={18} />

                support@bizbrain.ai

              </div>

              <div className="flex gap-3">

                <Phone size={18} />

                +91 9876543210

              </div>

              <div className="flex gap-3">

                <MapPin size={18} />

                Noida, India

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-slate-500">

            © 2026 BizBrain AI. All Rights Reserved.

          </p>

          <div className="flex gap-5 mt-6 md:mt-0">

  <a
    href="https://github.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaGithub
      className="text-2xl text-slate-400 hover:text-white transition"
    />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaLinkedin
      className="text-2xl text-slate-400 hover:text-blue-500 transition"
    />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram
      className="text-2xl text-slate-400 hover:text-pink-500 transition"
    />
  </a>

  <a
    href="https://x.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaXTwitter
      className="text-2xl text-slate-400 hover:text-white transition"
    />
  </a>

</div>

        </div>

      </div>

    </footer>
  );
}
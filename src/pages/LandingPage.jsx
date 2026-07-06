import Hero from "../components/landing/Hero";
import WhyBizBrain from "../components/landing/WhyBizBrain";
import HowItWorks from "../components/landing/HowItWorks";
import DashboardPreview from "../components/landing/DashboardPreview";
import AIShowcase from "../components/landing/AIShowcase";
import Testimonials from "../components/landing/Testimonials";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Hero />
<WhyBizBrain />
<HowItWorks />
 <DashboardPreview />
  <AIShowcase />
  <Testimonials />
  <FinalCTA />
  <Footer />
    </div>
  );
}

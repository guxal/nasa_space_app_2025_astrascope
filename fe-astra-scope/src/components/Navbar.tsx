import { Sparkles } from "lucide-react";
import logo from "@/assets/exoplanet-logo.png";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Exoplanet Logo" className="h-10 w-10" />
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AstraScope - Exoplanet AI Classifier
            </h1>
            <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

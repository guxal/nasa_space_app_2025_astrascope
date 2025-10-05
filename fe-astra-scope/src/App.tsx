import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Classify from "./pages/Classify";
import Metrics from "./pages/Metrics";
import Scan from "./pages/Scan";
import Tuning from "./pages/Tuning";
import Learning from "./pages/Learning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-cosmic">
          <Navbar />
          <Navigation />
          <Routes>
            <Route path="/" element={<Classify />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/learning" element={<Learning />} />
            {/* <Route path="/scan" element={<Scan />} /> */}
            <Route path="/tuning" element={<Tuning />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

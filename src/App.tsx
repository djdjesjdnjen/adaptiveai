import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProjectSpecification from "./pages/ProjectSpecification";
import './App.css';
import { CodeOptimizer } from './utils/code-optimizer';

const queryClient = new QueryClient();

// Initialize performance monitoring
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    const suggestions = CodeOptimizer.collectMetrics();
    if (suggestions.length > 0) {
      console.info('Code optimization suggestions:', suggestions);
    }
  }, 24 * 60 * 60 * 1000); // Run daily
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/project-specification" element={<ProjectSpecification />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
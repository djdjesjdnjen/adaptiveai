import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProjectSpecification from "./pages/ProjectSpecification";
import './App.css';
import { CodeOptimizer } from './utils/code-optimizer';
import { useEffect, useState } from 'react';
import { detectPlatform, PlatformInfo, isSecureContext } from './utils/platform-detector';
import { useToast } from '@/components/ui/use-toast';

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

function App() {
  const [platform, setPlatform] = useState<PlatformInfo | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Detect platform
    const platformInfo = detectPlatform();
    setPlatform(platformInfo);

    // Security checks
    if (!isSecureContext()) {
      toast({
        title: "Security Warning",
        description: "This site is not running in a secure context",
        variant: "destructive"
      });
    }

    if (platformInfo.isBot) {
      toast({
        title: "Bot Detected",
        description: "Automated access detected. Some features may be limited.",
        variant: "warning"
      });
    }

    // Add security headers
    document.getElementsByTagName('head')[0].innerHTML += `
      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval';">
      <meta http-equiv="X-Frame-Options" content="DENY">
      <meta http-equiv="X-Content-Type-Options" content="nosniff">
    `;
  }, []);

  return (
    <div className={`app-container ${platform?.isMobile ? 'mobile' : 'desktop'}`}>
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
      {platform && (
        <div className="platform-info hidden">
          OS: {platform.os} | Browser: {platform.browser} | Device: {platform.device}
        </div>
      )}
    </div>
  );
}

export default App;
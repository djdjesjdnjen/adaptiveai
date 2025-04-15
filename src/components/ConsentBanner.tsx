
import React, { useState, useEffect } from 'react';
import { hasAnalyticsConsent, saveAnalyticsConsent } from '@/utils/analytics';
import { Button } from '@/components/ui/button';
import { Shield, Info } from 'lucide-react';

const ConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = hasAnalyticsConsent();
    if (hasConsent === undefined || hasConsent === null) {
      // If no choice has been made yet, show the banner
      setShowBanner(true);
    }
  }, []);
  
  const handleAccept = () => {
    saveAnalyticsConsent(true);
    setShowBanner(false);
  };
  
  const handleDecline = () => {
    saveAnalyticsConsent(false);
    setShowBanner(false);
  };
  
  if (!showBanner) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50 animate-fade-in">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex items-start md:items-center mb-4 md:mb-0">
          <Shield className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Privacy Preference</h3>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              This website uses cookies and analytics tracking to understand user behavior and improve the experience. 
              Your data is anonymized and secured. You can change your preferences at any time.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept Tracking
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <Info className="h-4 w-4 mr-1" /> Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;

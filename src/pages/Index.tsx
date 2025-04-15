
import React, { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { trackPageView, startSessionTimer, initScrollTracking } from '@/utils/analytics';
import Navbar from '@/components/Navbar';
import ConsentBanner from '@/components/ConsentBanner';
import AnalyticsOverview from '@/components/Dashboard/AnalyticsOverview';
import UserBehaviorChart from '@/components/Dashboard/UserBehaviorChart';
import PerformanceMetrics from '@/components/Dashboard/PerformanceMetrics';
import MLInsights from '@/components/MLInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Download, BarChart3 } from 'lucide-react';

const Index = () => {
  const { userBehaviorData, performanceData, isLoading, error } = useAnalytics();
  
  useEffect(() => {
    // Start tracking the current page view
    trackPageView('/dashboard');
    
    // Start session timer
    const endSession = startSessionTimer();
    
    // Initialize scroll tracking
    const getScrollDepth = initScrollTracking();
    
    // Clean up
    return () => {
      const sessionDuration = endSession();
      const scrollDepth = getScrollDepth();
      console.log(`Session ended after ${sessionDuration}s with max scroll depth ${scrollDepth}%`);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container pt-20 pb-10 px-4 mx-auto">
        <header className="mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">AI-Powered Adaptive Website Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Real-time analytics and ML-driven insights to optimize your website experience
              </p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
        </header>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights">ML Insights</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsOverview data={userBehaviorData} isLoading={isLoading} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <UserBehaviorChart data={userBehaviorData} isLoading={isLoading} />
              </div>
              
              <div>
                <PerformanceMetrics data={performanceData} isLoading={isLoading} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <MLInsights />
          </TabsContent>
          
          <TabsContent value="documentation">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold mb-4">Project Documentation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Technical Architecture</h3>
                  <p className="text-gray-600">
                    This adaptive website is built using a microservices architecture with React, TypeScript, 
                    and real-time analytics processing. It integrates machine learning algorithms to optimize 
                    the user experience based on behavior patterns.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Key Components</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li><span className="font-medium">User Behavior Analytics:</span> Tracking system for user interactions, session metrics, and journey mapping</li>
                    <li><span className="font-medium">Machine Learning Engine:</span> Content recommendation and UI optimization algorithms</li>
                    <li><span className="font-medium">A/B Testing Framework:</span> Automated experimentation system with statistical significance analysis</li>
                    <li><span className="font-medium">Privacy Compliance:</span> GDPR-compliant data handling with consent management</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
                  <p className="text-gray-600">
                    The system targets the following improvements over baseline metrics:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mt-2">
                    <li>25% increase in user engagement</li>
                    <li>15% reduction in bounce rate</li>
                    <li>20% improvement in conversion rate</li>
                    <li>30% better user satisfaction scores</li>
                    <li>Sub-2-second page load times</li>
                    <li>99.9% uptime</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="text-lg font-medium mb-2">Implementation Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex">
                      <div className="w-40 font-medium">Phase 1 (Week 1-2):</div>
                      <div className="text-gray-600">Architecture setup and core analytics implementation</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-medium">Phase 2 (Week 3-4):</div>
                      <div className="text-gray-600">ML model training and integration</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-medium">Phase 3 (Week 5-6):</div>
                      <div className="text-gray-600">A/B testing framework and dashboard development</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-medium">Phase 4 (Week 7-8):</div>
                      <div className="text-gray-600">Performance optimization and compliance verification</div>
                    </div>
                    <div className="flex">
                      <div className="w-40 font-medium">Launch (Week 9):</div>
                      <div className="text-gray-600">Deployment and initial monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <ConsentBanner />
    </div>
  );
};

export default Index;

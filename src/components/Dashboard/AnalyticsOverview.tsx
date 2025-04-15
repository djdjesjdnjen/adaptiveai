import React from 'react';
import { UserBehaviorData } from '@/hooks/useAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Users, Clock, MousePointer, BarChart } from 'lucide-react';

interface AnalyticsOverviewProps {
  data: UserBehaviorData | null;
  isLoading: boolean;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Updated grid for better mobile layout */}
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardTitle className="h-6 bg-gray-200 rounded w-full"></CardTitle> {/* Made width full for mobile */}
              <CardDescription className="h-4 bg-gray-100 rounded w-full"></CardDescription> {/* Made width full for mobile */}
            </CardHeader>
            <CardContent>
              <div className="h-10 bg-gray-200 rounded w-full"></div> {/* Made width full for mobile */}
              <div className="h-4 bg-gray-100 rounded w-full mt-2"></div> {/* Made width full for mobile */}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Unable to load analytics data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      title: "Unique Visitors",
      value: data.uniqueVisitors.toLocaleString(),
      change: "+12.3%",
      positive: true,
      icon: Users
    },
    {
      title: "Avg. Session Time",
      value: `${Math.floor(data.averageSessionTime / 60)}m ${data.averageSessionTime % 60}s`,
      change: "+8.1%",
      positive: true,
      icon: Clock
    },
    {
      title: "Bounce Rate",
      value: `${data.bounceRate}%`,
      change: "-2.5%",
      positive: true,
      icon: MousePointer
    },
    {
      title: "Conversion Rate",
      value: `${data.conversionRate}%`,
      change: "-0.8%",
      positive: false,
      icon: BarChart
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in"> {/* Updated grid for better mobile layout */}
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-md bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white transition-all duration-300"> {/* Added shadow for better visual separation on mobile */}
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{metric.value}</div> {/* Reduced text size for better mobile view */}
            <p className={`text-xs flex items-center ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.positive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              <span>{metric.change} from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="mt-4">
      <ExportOptions />
    </div>
    </>
  );
};

export default AnalyticsOverview;
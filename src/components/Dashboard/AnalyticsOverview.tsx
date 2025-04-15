
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
              <CardDescription className="h-4 bg-gray-100 rounded w-1/2"></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mt-2"></div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
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
  );
};

export default AnalyticsOverview;

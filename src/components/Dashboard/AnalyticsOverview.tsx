
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserBehaviorData } from '@/hooks/useAnalytics';
import ExportOptions from './ExportOptions';
import { Activity, Users, MousePointer } from 'lucide-react';

interface Props {
  data: UserBehaviorData | null;
  isLoading: boolean;
}

const AnalyticsOverview: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Data Unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Unable to load analytics data. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      title: "Page Views",
      value: data.pageViews.toLocaleString(),
      icon: Activity,
    },
    {
      title: "Unique Visitors",
      value: data.uniqueVisitors.toLocaleString(),
      icon: Users,
    },
    {
      title: "Bounce Rate",
      value: `${data.bounceRate}%`,
      icon: MousePointer,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card key={index} className="transition-all hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ExportOptions />
    </div>
  );
};

export default AnalyticsOverview;

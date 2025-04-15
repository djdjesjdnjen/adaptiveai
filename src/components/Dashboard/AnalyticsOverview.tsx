import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserBehaviorData } from '@/hooks/useAnalytics';
import ExportOptions from './ExportOptions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: UserBehaviorData | null;
  isLoading: boolean;
}

const AnalyticsOverview: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Page Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.pageViews}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unique Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.uniqueVisitors}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bounce Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.bounceRate}%</div>
        </CardContent>
      </Card>

      <div className="md:col-span-2 lg:col-span-3">
        <ExportOptions />
      </div>
    </div>
  );
};

export default AnalyticsOverview;
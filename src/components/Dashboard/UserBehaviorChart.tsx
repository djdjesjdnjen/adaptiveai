
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserBehaviorData } from '@/hooks/useAnalytics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

interface UserBehaviorChartProps {
  data: UserBehaviorData | null;
  isLoading: boolean;
}

// Sample data for time series chart
const timeSeriesData = [
  { name: 'Week 1', visitors: 3200, pageViews: 7800, conversions: 120 },
  { name: 'Week 2', visitors: 3800, pageViews: 8900, conversions: 168 },
  { name: 'Week 3', visitors: 3500, pageViews: 7600, conversions: 142 },
  { name: 'Week 4', visitors: 4100, pageViews: 9200, conversions: 185 },
  { name: 'Week 5', visitors: 4300, pageViews: 10100, conversions: 201 },
  { name: 'Week 6', visitors: 4200, pageViews: 9800, conversions: 197 },
  { name: 'Week 7', visitors: 4500, pageViews: 11200, conversions: 223 },
  { name: 'Week 8', visitors: 4800, pageViews: 12400, conversions: 245 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const UserBehaviorChart: React.FC<UserBehaviorChartProps> = ({ data, isLoading }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current && data && data.clickHeatmap.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the heatmap points
      data.clickHeatmap.forEach(([x, y, intensity]) => {
        const radius = intensity / 5;
        
        // Create a radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(37, 99, 235, ${intensity / 100})`);
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
        
        // Draw the point
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] bg-gray-100 rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] bg-gray-100 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Behavior Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data available for visualization.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>User Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="visitors" 
                  stackId="1" 
                  stroke="#2563eb" 
                  fill="rgba(37, 99, 235, 0.2)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="pageViews" 
                  stackId="2" 
                  stroke="#0d9488" 
                  fill="rgba(13, 148, 136, 0.2)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversions" 
                  stackId="3" 
                  stroke="#f97316" 
                  fill="rgba(249, 115, 22, 0.2)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Pages Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topPages} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="page" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="visits" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Click Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-50 border border-gray-200 rounded-md" style={{ height: '250px' }}>
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={250} 
              className="w-full h-full" 
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm">
              Website Layout Representation
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>User Journey Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.userJourney}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ from, to, count }) => `${from} → ${to} (${count})`}
                >
                  {data.userJourney.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${props.payload.from} → ${props.payload.to}: ${value}`, 'Transitions']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBehaviorChart;

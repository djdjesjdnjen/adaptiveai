
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, TrendingUp, Zap } from 'lucide-react';
import { getUIOptimizationSuggestions } from '@/utils/ml-utils';

const MLInsights: React.FC = () => {
  const uiSuggestions = getUIOptimizationSuggestions();
  
  // Sample A/B test results
  const abTests = [
    {
      name: "Homepage Hero Image",
      status: "Completed",
      improvement: 18.5,
      confidence: 96
    },
    {
      name: "Checkout Flow Redesign",
      status: "Running",
      improvement: 12.3,
      confidence: 88
    },
    {
      name: "Product Page Layout",
      status: "Completed",
      improvement: -2.1,
      confidence: 94
    },
    {
      name: "Mobile Navigation Menu",
      status: "Running",
      improvement: 7.5,
      confidence: 78
    }
  ];
  
  // Sample user segments
  const userSegments = [
    {
      name: "Power Users",
      size: "15%",
      traits: ["High engagement", "Regular visits", "Multiple conversions"],
      description: "Highly engaged users who frequently return and convert"
    },
    {
      name: "Browsers",
      size: "40%",
      traits: ["Medium engagement", "Single session", "Low conversion"],
      description: "Users who explore but rarely convert"
    },
    {
      name: "Mobile Shoppers",
      size: "25%",
      traits: ["Mobile devices", "Short sessions", "Direct navigation"],
      description: "Users who primarily access via mobile with focused intent"
    },
    {
      name: "New Visitors",
      size: "20%",
      traits: ["First visit", "Discovery phase", "Varied behavior"],
      description: "First-time visitors exploring the site"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" /> 
                  UI Optimization Suggestions
                </CardTitle>
                <CardDescription>
                  ML-driven recommendations for interface improvements
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UI Element</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uiSuggestions.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.element}</TableCell>
                    <TableCell>{item.suggestion}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.confidence > 80 ? 'default' : 'outline'} className={
                        item.confidence > 80 ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                      }>
                        {item.confidence}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" /> 
                  A/B Testing Results
                </CardTitle>
                <CardDescription>
                  Performance data from automated testing
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Improvement</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abTests.map((test, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>
                      <Badge variant={test.status === "Completed" ? 'default' : 'outline'}>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={test.improvement >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {test.improvement >= 0 ? '+' : ''}{test.improvement}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{test.confidence}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" /> 
            AI-Identified User Segments
          </CardTitle>
          <CardDescription>
            Automatically detected user groups based on behavior patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {userSegments.map((segment, i) => (
              <Card key={i} className="border-l-4" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{segment.name}</CardTitle>
                  <CardDescription className="text-sm">{segment.size} of users</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="text-sm space-y-1">
                    {segment.traits.map((trait, j) => (
                      <li key={j} className="flex items-start">
                        <ArrowRight className="h-3 w-3 mr-1 mt-1 text-primary" /> {trait}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">{segment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLInsights;


import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, Calendar, FileText, Database, Brain, Server, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectSpecification = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container pt-20 pb-10 px-4 mx-auto">
        <header className="mt-8 mb-6">
          <h1 className="text-3xl font-bold">AI-Powered Adaptive Website Project Specification</h1>
          <p className="text-gray-600 mt-2 text-lg">
            A self-optimizing website leveraging machine learning to deliver personalized user experiences
          </p>
        </header>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Objective</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Develop a self-optimizing website that leverages machine learning to deliver personalized user experiences 
              while maintaining privacy and performance standards.
            </p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="requirements" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="requirements">Core Requirements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics System</TabsTrigger>
            <TabsTrigger value="ml">ML Implementation</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Core Requirements Overview
                </CardTitle>
                <CardDescription>Key components and deliverables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Database className="h-5 w-5 mr-2 text-blue-500" />
                    User Behavior Analytics System
                  </h3>
                  <ul className="list-disc pl-10 space-y-1 text-gray-700">
                    <li>Comprehensive tracking (click patterns, heatmaps, session metrics)</li>
                    <li>User journey mapping and exit points analysis</li>
                    <li>Content interaction depth measurement</li>
                    <li>Cross-device usage pattern tracking</li>
                    <li>Explicit and implicit preference indicators</li>
                    <li>GDPR-compliant data storage with consent management</li>
                    <li>Data anonymization and encryption protocols</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-500" />
                    Machine Learning Implementation
                  </h3>
                  <ul className="list-disc pl-10 space-y-1 text-gray-700">
                    <li>Supervised learning algorithms for content recommendations</li>
                    <li>UI element placement optimization</li>
                    <li>Navigation path prediction</li>
                    <li>User segment identification</li>
                    <li>Automated A/B testing framework</li>
                    <li>Statistical significance thresholds</li>
                    <li>Multi-variant testing capabilities</li>
                    <li>Bias detection and correction mechanisms</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Server className="h-5 w-5 mr-2 text-amber-500" />
                    Technical Architecture
                  </h3>
                  <ul className="list-disc pl-10 space-y-1 text-gray-700">
                    <li>Microservices architecture for scalability</li>
                    <li>RESTful API design</li>
                    <li>Real-time data processing pipeline</li>
                    <li>Automated CI/CD pipeline</li>
                    <li>Comprehensive error logging and monitoring</li>
                    <li>Load balancing and auto-scaling capabilities</li>
                    <li>Disaster recovery protocols</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-red-500" />
                    Performance Metrics & Success Criteria
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    {[
                      { label: "User Engagement", value: "+25%" },
                      { label: "Bounce Rate", value: "-15%" },
                      { label: "Conversion Rate", value: "+20%" },
                      { label: "User Satisfaction", value: "+30%" },
                      { label: "Page Load Time", value: "<2s" },
                      { label: "Uptime", value: "99.9%" }
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-md border">
                        <span className="text-gray-700">{metric.label}</span>
                        <Badge variant="outline" className="font-medium">{metric.value}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    Documentation Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <ul className="list-disc pl-10 space-y-1 text-gray-700">
                      <li>Technical architecture documentation</li>
                      <li>API documentation</li>
                      <li>Machine learning model documentation</li>
                      <li>Implementation guide</li>
                    </ul>
                    <ul className="list-disc pl-10 space-y-1 text-gray-700">
                      <li>Maintenance procedures</li>
                      <li>Security protocols</li>
                      <li>Testing procedures</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deliverables</CardTitle>
                <CardDescription>End products and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Production-ready Website", description: "Self-optimizing website with ML capabilities" },
                    { title: "Analytics Dashboard", description: "Comprehensive visualization of user behavior data" },
                    { title: "Documentation Package", description: "Complete technical and user documentation" },
                    { title: "Training Materials", description: "Resources for maintenance team" },
                    { title: "Security Audit Report", description: "Comprehensive security assessment" },
                    { title: "Performance Benchmark Report", description: "Baseline and improvement metrics" }
                  ].map((item, i) => (
                    <Card key={i} className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-500" />
                  User Behavior Analytics System
                </CardTitle>
                <CardDescription>Comprehensive tracking and analysis of user interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Tracking Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Click Patterns & Heatmaps",
                        description: "Record and visualize where users click and interact with elements"
                      },
                      {
                        title: "Session Metrics",
                        description: "Track duration, page-specific time, and interaction frequency"
                      },
                      {
                        title: "User Journey Mapping",
                        description: "Analyze navigation paths, entry/exit points, and conversion funnels"
                      },
                      {
                        title: "Content Interaction Depth",
                        description: "Measure scroll depth, form completion rates, and media engagement"
                      },
                      {
                        title: "Cross-Device Tracking",
                        description: "Follow user journeys across multiple devices and sessions"
                      },
                      {
                        title: "Preference Indicators",
                        description: "Collect both explicit preferences and infer implicit interests"
                      }
                    ].map((item, i) => (
                      <Card key={i} className="border shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Privacy & Compliance</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">GDPR Compliance</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>User consent management before data collection</li>
                        <li>Right to access, modify, and delete personal data</li>
                        <li>Data protection impact assessments</li>
                        <li>Privacy by design and default principles</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Data Security</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>End-to-end encryption of personal data</li>
                        <li>Pseudonymization and anonymization techniques</li>
                        <li>Secure data storage and access controls</li>
                        <li>Regular security audits and vulnerability scanning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ml" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-500" />
                  Machine Learning Implementation
                </CardTitle>
                <CardDescription>AI-driven personalization and optimization systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Supervised Learning Algorithms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Content Recommendation Engine",
                        description: "Personalized content suggestions based on user behavior and preferences"
                      },
                      {
                        title: "UI Element Optimization",
                        description: "Dynamic placement and styling of interface elements to maximize engagement"
                      },
                      {
                        title: "Navigation Path Prediction",
                        description: "Anticipating user needs and streamlining journey paths"
                      },
                      {
                        title: "User Segment Identification",
                        description: "Automatic clustering of users based on behavior patterns"
                      }
                    ].map((item, i) => (
                      <Card key={i} className="border shadow-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">A/B Testing Framework</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Statistical Analysis</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Confidence level thresholds (95% minimum)</li>
                        <li>Sample size determination</li>
                        <li>Bayesian vs. Frequentist testing approaches</li>
                        <li>Accounting for novelty effect and statistical noise</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Testing Capabilities</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Multi-variant testing (testing multiple variables simultaneously)</li>
                        <li>Sequential testing for continuous optimization</li>
                        <li>Segment-specific test targeting</li>
                        <li>Bias detection and mitigation strategies</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Performance Monitoring</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Real-time test result dashboards</li>
                        <li>Automated stoppage for underperforming variants</li>
                        <li>Alert system for anomalous test behavior</li>
                        <li>Long-term impact analysis beyond initial test window</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-amber-500" />
                  Technical Architecture
                </CardTitle>
                <CardDescription>Scalable, resilient system design</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Microservices Architecture</h3>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <p className="text-sm text-gray-700 mb-3">
                      The system is built on a microservices architecture with the following key services:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                      <li>User Analytics Service - Collecting and processing user behavior data</li>
                      <li>Machine Learning Service - Running recommendation and optimization algorithms</li>
                      <li>Content Management Service - Managing website content and structure</li>
                      <li>A/B Testing Service - Managing test configuration and results analysis</li>
                      <li>User Preference Service - Storing and retrieving user settings and preferences</li>
                      <li>Authentication & Authorization Service - Managing user access and security</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">RESTful API Design</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Resource-oriented architecture</li>
                        <li>Consistent versioning strategy</li>
                        <li>Comprehensive documentation with OpenAPI</li>
                        <li>Rate limiting and throttling</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Data Processing Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Real-time event streaming</li>
                        <li>Stream processing with Apache Kafka</li>
                        <li>Batch processing for historical analysis</li>
                        <li>Data warehousing for aggregations</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">CI/CD Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Automated testing at all levels</li>
                        <li>Containerized deployments with Docker</li>
                        <li>Infrastructure as Code with Terraform</li>
                        <li>Blue/green deployment strategy</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Logging & Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Centralized logging with ELK stack</li>
                        <li>Distributed tracing with OpenTelemetry</li>
                        <li>Real-time alerting and notifications</li>
                        <li>Performance dashboards</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Scalability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Horizontal scaling with Kubernetes</li>
                        <li>Auto-scaling based on traffic patterns</li>
                        <li>Load balancing across regions</li>
                        <li>Database sharding strategies</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Disaster Recovery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                        <li>Multi-region failover capability</li>
                        <li>Regular backup and restore testing</li>
                        <li>Recovery time objectives (RTO) &lt; 15 minutes</li>
                        <li>Recovery point objectives (RPO) &lt; 5 minutes</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  Implementation Timeline
                </CardTitle>
                <CardDescription>Phased approach over 9 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {[
                    {
                      phase: "Phase 1: Foundation",
                      weeks: "Weeks 1-2",
                      tasks: [
                        "Project kickoff and requirement finalization",
                        "Technical architecture design and approval",
                        "Core infrastructure setup",
                        "Base analytics implementation",
                        "Development environment configuration"
                      ],
                      milestone: "Architecture Documentation & Core Infrastructure"
                    },
                    {
                      phase: "Phase 2: Analytics System",
                      weeks: "Weeks 3-4",
                      tasks: [
                        "User behavior tracking implementation",
                        "Data storage and processing pipeline setup",
                        "Consent management system development",
                        "Privacy and security controls implementation",
                        "Initial dashboard development"
                      ],
                      milestone: "Functional Analytics System & GDPR Compliance"
                    },
                    {
                      phase: "Phase 3: Machine Learning Implementation",
                      weeks: "Weeks 5-6",
                      tasks: [
                        "ML model development and training",
                        "Content recommendation engine implementation",
                        "User segmentation algorithm deployment",
                        "A/B testing framework setup",
                        "Initial model validation and optimization"
                      ],
                      milestone: "Operational ML Systems & Initial Optimization Results"
                    },
                    {
                      phase: "Phase 4: Integration & Optimization",
                      weeks: "Weeks 7-8",
                      tasks: [
                        "Frontend adaptive features implementation",
                        "System component integration",
                        "Performance optimization",
                        "Comprehensive testing (security, load, user acceptance)",
                        "Documentation finalization"
                      ],
                      milestone: "Complete Integrated System & Documentation"
                    },
                    {
                      phase: "Phase 5: Deployment",
                      weeks: "Week 9",
                      tasks: [
                        "Production deployment preparation",
                        "Staging environment validation",
                        "Go-live and production monitoring",
                        "Training delivery to maintenance team",
                        "Performance benchmark reporting"
                      ],
                      milestone: "Production Launch & Performance Reports"
                    }
                  ].map((phase, i) => (
                    <div key={i} className="relative flex items-center md:justify-between group">
                      <div className="flex items-center mb-1 md:mb-0 md:w-1/2 md:pr-5">
                        <div className="flex shrink-0 w-10 h-10 rounded-full bg-white shadow border border-slate-200 items-center justify-center mr-4 md:mr-0 ring-2 ring-white">
                          <span className="font-bold text-slate-600">{i + 1}</span>
                        </div>
                        <div className="md:hidden">
                          <div className="font-bold text-slate-900">{phase.phase}</div>
                          <div className="text-sm text-slate-500">{phase.weeks}</div>
                        </div>
                      </div>
                      
                      <div className="grow flex md:w-1/2 md:pl-5">
                        <div className="bg-white p-4 rounded-md border shadow-sm w-full ml-5 md:ml-0">
                          <div className="hidden md:block mb-1">
                            <div className="font-bold text-slate-900">{phase.phase}</div>
                            <div className="text-sm text-slate-500">{phase.weeks}</div>
                          </div>
                          <ul className="text-sm text-slate-600 space-y-1 mt-2 list-disc pl-5">
                            {phase.tasks.map((task, j) => (
                              <li key={j}>{task}</li>
                            ))}
                          </ul>
                          <div className="mt-2 pt-2 border-t">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              Milestone: {phase.milestone}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectSpecification;

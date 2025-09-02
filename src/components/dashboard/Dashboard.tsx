import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Sparkles } from 'lucide-react';
import { DataVisualization } from './DataVisualization';
import { ChatInterface } from './ChatInterface';
import { ComparisonCards } from './ComparisonCards';

export const Dashboard: React.FC = () => {
  const handleExportPDF = () => {
    // PDF export logic would go here
    console.log('Exporting dashboard as PDF...');
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-6 rounded-2xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
            Oceanic AI Dashboard
          </h1>
          <p className="text-foreground-muted flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            Advanced analytics with predictive intelligence
          </p>
        </div>
        
        <Button 
          variant="export" 
          className="gap-2" 
          onClick={handleExportPDF}
        >
          <Download className="w-4 h-4" />
          Export as PDF
        </Button>
      </div>

      {/* Comparison Cards */}
      <ComparisonCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Data Visualizations */}
        <div className="xl:col-span-2 space-y-6">
          <DataVisualization 
            title="Ocean Temperature Trends" 
            subtitle="Real-time monitoring with predictive analysis"
          />
          <DataVisualization 
            title="System Performance Metrics" 
            subtitle="Efficiency and resource utilization patterns"
          />
          <DataVisualization 
            title="Activity Correlation Analysis" 
            subtitle="Multi-variable trend analysis with forecasting"
          />
        </div>
        
        {/* Chat Interface */}
        <div className="xl:col-span-1">
          <ChatInterface />
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};
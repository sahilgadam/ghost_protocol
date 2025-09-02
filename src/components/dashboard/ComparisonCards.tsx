import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface ComparisonData {
  title: string;
  currentValue: number;
  previousValue: number;
  unit: string;
  description: string;
}

const mockComparisonData: ComparisonData[] = [
  {
    title: "Ocean Temperature",
    currentValue: 24.7,
    previousValue: 22.4,
    unit: "°C",
    description: "Average temperature across monitoring zones"
  },
  {
    title: "Efficiency Rate",
    currentValue: 87.3,
    previousValue: 92.1,
    unit: "%",
    description: "System performance compared to baseline"
  },
  {
    title: "Activity Index",
    currentValue: 156,
    previousValue: 134,
    unit: "pts",
    description: "Aggregated activity measurement"
  },
  {
    title: "Resource Usage",
    currentValue: 68.2,
    previousValue: 71.8,
    unit: "%",
    description: "Current vs optimal resource allocation"
  }
];

export const ComparisonCards: React.FC = () => {
  const renderMetricCard = (data: ComparisonData, index: number) => {
    const change = ((data.currentValue - data.previousValue) / data.previousValue) * 100;
    const isPositive = change > 0;
    const isSignificant = Math.abs(change) > 5;

    return (
      <Card key={index} className="glass-panel-hover p-4 space-y-3 animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">{data.title}</h4>
            <p className="text-xs text-foreground-subtle">{data.description}</p>
          </div>
          <Badge variant={isSignificant ? (isPositive ? "default" : "destructive") : "secondary"} className="glass-panel">
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(change).toFixed(1)}%
          </Badge>
        </div>
        
        <div className="space-y-2">
          {/* Current vs Previous Values */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{data.currentValue}{data.unit}</div>
              <div className="text-xs text-foreground-subtle">Current</div>
            </div>
            
            <ArrowRight className="w-4 h-4 text-foreground-muted" />
            
            <div className="text-center">
              <div className="text-lg font-bold text-foreground-muted">{data.previousValue}{data.unit}</div>
              <div className="text-xs text-foreground-subtle">Previous</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-glass-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  isPositive ? 'bg-gradient-to-r from-primary to-primary-glow' : 'bg-gradient-to-r from-destructive to-destructive'
                }`}
                style={{ 
                  width: `${Math.min(100, Math.abs(change) * 2)}%`,
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Explanation */}
        <div className="pt-2 border-t border-card-border/30">
          <p className="text-xs text-foreground-subtle">
            {isPositive ? "Increase" : "Decrease"} of {Math.abs(change).toFixed(1)}% compared to previous period
            {isSignificant && " - Significant change detected"}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Comparison</h2>
          <p className="text-sm text-foreground-muted">Current period vs previous period analysis</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockComparisonData.map((data, index) => renderMetricCard(data, index))}
      </div>
    </div>
  );
};
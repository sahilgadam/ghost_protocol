import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, ComposedChart } from 'recharts';

const generateMockData = () => {
  const data = [];
  const baseValue = 100;
  for (let i = 0; i < 50; i++) {
    const trend = i * 2;
    const noise = (Math.random() - 0.5) * 20;
    const value = baseValue + trend + noise;
    const prediction = baseValue + trend + (Math.random() - 0.5) * 10;
    
    data.push({
      time: i,
      value: Math.max(0, value),
      prediction: Math.max(0, prediction),
      trendLower: Math.max(0, prediction - 15),
      trendUpper: Math.max(0, prediction + 15),
    });
  }
  return data;
};

interface DataVisualizationProps {
  title: string;
  subtitle: string;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({ title, subtitle }) => {
  const [timeRange, setTimeRange] = useState([0, 49]);
  const data = generateMockData();
  const filteredData = data.slice(timeRange[0], timeRange[1] + 1);

  return (
    <Card className="glass-panel-hover p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-foreground-muted">{subtitle}</p>
      </div>
      
      {/* Time Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-foreground-subtle">
          <span>Start: {timeRange[0]}</span>
          <span>End: {timeRange[1]}</span>
        </div>
        <Slider
          value={timeRange}
          onValueChange={setTimeRange}
          max={49}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--foreground-subtle))', fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--foreground-subtle))', fontSize: 10 }}
            />
            
            {/* Prediction area */}
            <Area
              dataKey="trendUpper"
              stroke="none"
              fill="hsl(var(--primary-glow))"
              fillOpacity={0.2}
            />
            <Area
              dataKey="trendLower"
              stroke="none"
              fill="hsl(var(--background))"
              fillOpacity={1}
            />
            
            {/* Actual data line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              filter="url(#glow)"
            />
            
            {/* Prediction line */}
            <Line
              type="monotone"
              dataKey="prediction"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
            
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary"></div>
          <span className="text-foreground-subtle">Actual Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-secondary border-dashed"></div>
          <span className="text-foreground-subtle">Prediction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 bg-primary-glow/20 border border-primary-glow/40"></div>
          <span className="text-foreground-subtle">Confidence Range</span>
        </div>
      </div>
    </Card>
  );
};
import React from 'react';
import MonitorViewsContainer from '@/pages/monitor/components/MonitorViewsContainer';

const YARNMetrics: React.FC = () => {
  return (
    <div className="yarn-metrics-page">
      <MonitorViewsContainer 
        displayLocation="YARN"
        className="yarn-monitor-views"
      />
    </div>
  );
};

export default YARNMetrics; 
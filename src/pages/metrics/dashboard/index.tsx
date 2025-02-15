import React from 'react';
import MonitorViewsContainer from '@/pages/monitor/components/MonitorViewsContainer';

const DashBoardMetrics: React.FC = () => {
  return (
    <div className="dashboard-metrics-page">
      <MonitorViewsContainer 
        displayLocation="Dashboard"
        className="dashboard-monitor-views"
      />
    </div>
  );
};

export default DashBoardMetrics; 
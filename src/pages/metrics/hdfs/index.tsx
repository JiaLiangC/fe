import React from 'react';
import MonitorViewsContainer from '@/pages/monitor/components/MonitorViewsContainer';

const HDFSMetrics: React.FC = () => {
  return (
    <div className="hdfs-metrics-page">
      <MonitorViewsContainer 
        displayLocation="HDFS"
        className="hdfs-monitor-views"
      />
    </div>
  );
};

export default HDFSMetrics; 
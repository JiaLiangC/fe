import React from 'react';
import { useParams } from 'react-router-dom';
import MonitorViewsContainer from '@/pages/monitor/components/MonitorViewsContainer';

const ServiceMetrics: React.FC = () => {
  // 从URL参数中获取serviceName
  const { serviceName } = useParams<{ serviceName: string }>();

  return (
    <div className={`${serviceName.toLowerCase()}-metrics-page`}>
      <MonitorViewsContainer 
        displayLocation={serviceName}
        className={`${serviceName.toLowerCase()}-monitor-views`}
      />
    </div>
  );
};

export default ServiceMetrics; 
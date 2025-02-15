import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ViewTabs from '../views/ViewTabs';
import ViewSettingsModal from '../views/ViewSettingsModal';
import { getDashboards } from '@/services/dashboardV2';
import Detail from '@/pages/dashboard/Detail/Detail';
import { Empty } from 'antd';

interface MonitorViewsContainerProps {
  displayLocation: string; // 每个页面传入自己的 displayLocation
  className?: string; // 可选的样式类名
}

const MonitorViewsContainer: React.FC<MonitorViewsContainerProps> = ({ 
  displayLocation,
  className 
}) => {
  const { t } = useTranslation('dashboard');
  const [views, setViews] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<string>();
  const [settingsVisible, setSettingsVisible] = useState(false);

  const fetchViews = async () => {
    const data = await getDashboards(1);
    // 过滤出包含当前 displayLocation 的仪表盘
    const filteredViews = data.filter((dashboard) => {
      const locations = dashboard.display_locations ? dashboard.display_locations.split(',') : [];
      return locations.includes(displayLocation);
    });
    setViews(filteredViews);
    if (!activeView && filteredViews.length > 0) {
      setActiveView(filteredViews[0].id.toString());
    }
  };

  useEffect(() => {
    fetchViews();
  }, [displayLocation]); // 当 displayLocation 改变时重新获取数据

  return (
    <div className={`monitor-views-container ${className || ''}`}>
      <div className="monitor-views-header">
        <ViewTabs
          views={views}
          activeKey={activeView}
          onChange={(key) => setActiveView(key)}
          onViewUpdate={fetchViews}
        />
        <Button
          icon={<SettingOutlined />}
          onClick={() => setSettingsVisible(true)}
        >
          {t('bind_dashboard')}
        </Button>
      </div>
      <div className="monitor-views-content">
        {activeView ? (
          <Detail 
            id={activeView}
            key={activeView}
          />
        ) : (
          <Empty 
            description={t('no_dashboard_bound')} 
            style={{ marginTop: 100 }}
          />
        )}
      </div>
      <ViewSettingsModal
        visible={settingsVisible}
        displayLocation={displayLocation}
        onCancel={() => setSettingsVisible(false)}
        onOk={() => {
          setSettingsVisible(false);
          fetchViews();
        }}
      />
    </div>
  );
};

export default MonitorViewsContainer; 
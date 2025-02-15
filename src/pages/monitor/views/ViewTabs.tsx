import React from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

interface Dashboard {
  id: number;
  name: string;
  display_locations: string;
}

interface ViewTabsProps {
  views: Dashboard[];
  activeKey?: string;
  onChange: (key: string) => void;
  onViewUpdate: () => void;
}

const ViewTabs: React.FC<ViewTabsProps> = ({ 
  views, 
  activeKey, 
  onChange
}) => {
  const { t } = useTranslation('dashboard');

  return (
    <div className="view-tabs">
      <Tabs 
        activeKey={activeKey}
        onChange={onChange}
        type="card"
      >
        {views.map(view => (
          <TabPane 
            tab={view.name}
            key={view.id.toString()}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default ViewTabs; 
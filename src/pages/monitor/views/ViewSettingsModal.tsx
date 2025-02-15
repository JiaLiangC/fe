import React, { useState } from 'react';
import { Modal, Form, Checkbox, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { getDashboards, updateDashboard } from '@/services/dashboardV2';

interface ViewSettingsModalProps {
  visible: boolean;
  displayLocation: string; // 固定的 display location
  onCancel: () => void;
  onOk: () => void;
}

const ViewSettingsModal: React.FC<ViewSettingsModalProps> = ({
  visible,
  displayLocation,
  onCancel,
  onOk,
}) => {
  const { t } = useTranslation('dashboard');
  const [form] = Form.useForm();
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取所有仪表盘
  React.useEffect(() => {
    if (visible) {
      setLoading(true);
      getDashboards(1)
        .then((res) => {
          setDashboards(res);
          // 重置表单，确保使用最新数据设置选中状态
          form.setFieldsValue({
            dashboards: res
              .filter((d) => {
                const locations = d.display_locations.split(',');
                return locations.includes(displayLocation);
              })
              .map((d) => d.id),
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [visible, form, displayLocation]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const selectedDashboardIds = values.dashboards || [];
      
      await Promise.all(
        dashboards.map(async (dashboard) => {
          const isSelected = selectedDashboardIds.includes(dashboard.id);
          const currentLocations = dashboard.display_locations.split(',').filter(Boolean);
          const wasSelected = currentLocations.includes(displayLocation);
          
          if (isSelected !== wasSelected) {
            const newLocations = isSelected
              ? [...currentLocations, displayLocation]
              : currentLocations.filter(loc => loc !== displayLocation);
            
            await updateDashboard(dashboard.id, {
              ...dashboard,
              display_locations: newLocations.join(','),
            });
          }
        })
      );
      
      message.success(t('common:success.edit'));
      onOk();
    } catch (err) {
      console.error(err);
      message.error(t('common:error.edit'));
    }
  };

  return (
    <Modal
      title={t('bind_dashboard')}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      width={600}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="dashboards"
            label={t('select_dashboards')}
          >
            <Checkbox.Group style={{ width: '100%' }}>
              {dashboards.map(dashboard => (
                <div key={dashboard.id} style={{ marginBottom: 8 }}>
                  <Checkbox value={dashboard.id}>
                    {dashboard.name}
                  </Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ViewSettingsModal; 
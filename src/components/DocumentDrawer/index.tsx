import React, { useEffect, useState } from 'react';
import { Drawer, Space, Spin } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import ModalHOC, { ModalWrapProps } from '../ModalHOC';
import './style.less';

interface Props {
  darkMode?: boolean;
  language?: string;
  width?: string | number;
  title: string;
  documentPath: string;
  type?: 'text' | 'iframe';
  onClose?: (destroy: () => void) => void;
}

const filenameMap = {
  zh_CN: '',
  zh_HK: '_hk',
  en_US: '_en',
};

function index(props: Props & ModalWrapProps) {
  const { visible, destroy, language = 'zh_CN', title, width = '60%', documentPath, onClose, type = 'text' } = props;
  const [document, setDocument] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (documentPath && type === 'text') {
      fetch(`${documentPath}/${language}.md`)
        .then((res) => {
          return res.text();
        })
        .then((res) => {
          setDocument(res);
        });
    }
  }, []);

  return (
    <Drawer
      width={width}
      title={
        <Space>
          {title}
          {type === 'iframe' && (
            <a target='_blank' href={`${documentPath}${filenameMap[language]}`}>
              <ExportOutlined />
            </a>
          )}
        </Space>
      }
      placement='right'
      onClose={() => {
        if (onClose) {
          onClose(destroy);
        } else {
          destroy();
        }
      }}
      visible={visible}
    >
      {type === 'text' && (
        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {document}
        </div>
      )}
      {type === 'iframe' && (
        <Spin spinning={loading} wrapperClassName='n9e-document-drawer-iframe-loading'>
          <iframe
            src={`${documentPath}${filenameMap[language]}?onlyContent`}
            style={{ width: '100%', height: '100%', border: '0 none', visibility: loading ? 'hidden' : 'visible' }}
            onLoad={() => {
              setLoading(false);
            }}
          />
        </Spin>
      )}
    </Drawer>
  );
}

export default ModalHOC<Props>(index);

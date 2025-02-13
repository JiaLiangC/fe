import React from 'react';
import { Input } from 'antd';

interface Props {
  value?: string;
  onChange: (value: string) => void;
  editabled: boolean;
  setReadmeEditabled: (editabled: boolean) => void;
}

export default function Instructions(props: Props) {
  const { value, onChange, editabled } = props;

  return (
    <div className='builtin-instructions'>
      {editabled ? (
        <Input.TextArea
          style={{ height: '100%' }}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      ) : (
        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
          {value}
        </div>
      )}
    </div>
  );
}

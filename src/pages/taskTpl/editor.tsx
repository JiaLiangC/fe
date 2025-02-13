/*
 * Copyright 2022 Nightingale Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { useContext } from 'react';
import { CommonStateContext } from '@/App';
// 暂时注释掉 ace-editor 相关导入
// import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/mode-sh';
// import 'ace-builds/src-noconflict/theme-github';
// import 'ace-builds/src-noconflict/ext-language_tools';

interface Props {
  height: string;
  readOnly: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function Editor(props: Props) {
  const { darkMode } = useContext(CommonStateContext);
  return (
    <textarea
      style={{ 
        width: '100%', 
        height: props.height,
        fontSize: '14px',
        padding: '8px',
        border: '1px solid #d9d9d9',
        borderRadius: '2px',
        backgroundColor: darkMode ? '#1e1e1e' : '#fff',
        color: darkMode ? '#fff' : '#000'
      }}
      readOnly={props.readOnly}
      value={props.value}
      onChange={(e) => {
        if (props.onChange) {
          props.onChange(e.target.value);
        }
      }}
    />
  );
}

Editor.defaultProps = {
  readOnly: false,
  height: '500px',
};

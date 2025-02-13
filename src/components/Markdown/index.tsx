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
import classNames from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CommonStateContext } from '@/App';
import './index.less';

interface IMarkDownPros {
  content: string;
  style?: any;
  darkMode?: boolean;
}

dark['pre[class*="language-"]'] = {
  ...dark['pre[class*="language-"]'],
  background: '#161b22',
  border: '0 none',
  'box-shadow': 'none',
};

const Markdown: React.FC<IMarkDownPros> = ({ content, style = {}, darkMode }) => {
  const currentDarkMode = darkMode ?? useContext(CommonStateContext)?.darkMode;

  return (
    <div className='markdown-wrapper' style={style}>
      <div className='base-code'>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default Markdown;

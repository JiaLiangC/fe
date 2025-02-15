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
import _ from 'lodash';
import request from '@/utils/request';
import { RequestMethod } from '@/store/common';
import { basePrefix } from '@/App';

export function getBusiGroups(params?: { query?: string; limit?: number; all?: boolean }) {
  const busiGroupsData = {
    "data": [
      {
        "id": 1,
        "name": "Default Busi Group",
        "label_enable": 0,
        "label_value": "",
        "create_at": 1737513101,
        "create_by": "root",
        "update_at": 1737513101,
        "update_by": "root",
        "user_groups": null
      }
    ],
    "err": ""
  };

  console.log('[Debug] getBusiGroups mock data:', busiGroupsData);
  return Promise.resolve(JSON.parse(JSON.stringify(busiGroupsData)));
}

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

// 匿名获取数据源列表
export function getDatasourceBriefList(): Promise<{ name: string; id: number; plugin_type: string }[]> {
  const url = basePrefix + '/api/v1/metrics/datasource/brief';
  return request(url, {
    method: RequestMethod.Get,
  })
    .then((res) => {
      return res.data || [];
    })
    .catch(() => {
      return [];
    });
}

export function getBusiGroups(query = '', limit: number = 5000) {
  const url = basePrefix + '/api/v1/metrics/busi-groups';
  console.log('[Debug] getBusiGroups url:', url);
  console.log('[Debug] getBusiGroups params:', { query, limit });

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
  return Promise.resolve(JSON.parse(JSON.stringify({
    dat: _.sortBy(busiGroupsData.data, (item) => _.lowerCase(item.name))
  })));
}

export function getPerm(busiGroup: string, perm: 'ro' | 'rw') {
  return request(basePrefix + `/api/n9e/busi-group/${busiGroup}/perm/${perm}`, {
    method: RequestMethod.Get,
  });
}

export function getMenuPerm() {
  const menuPermData = {
    "dat": [
      "/dashboards",
      "/monitoring/dashboards/add",
      "/monitoring/dashboards/put",
      "/monitoring/dashboards/del",
      "/embedded-dashboards/put",
      "/embedded-dashboards",
      "/public-dashboards",
      "/alert-rules",
      "/alert-rules/add",
      "/alert-rules/put",
      "/alert-rules/del",
      "/alert-mutes",
      "/alert-mutes/add",
      "/alert-mutes/put",
      "/alert-mutes/del",
      "/alert-subscribes",
      "/alert-subscribes/add",
      "/alert-subscribes/put",
      "/alert-subscribes/del",
      "/alert-cur-events",
      "/alert-cur-events/del",
      "/alert-his-events",
      "/recording-rules",
      "/recording-rules/add",
      "/recording-rules/put",
      "/recording-rules/del",
      "/metric/explorer",
      "/object/explorer",
      "/log/explorer",
      "/log/index-patterns",
      "/targets",
      "/targets/add",
      "/targets/put",
      "/targets/del",
      "/targets/bind",
      "/job-tpls",
      "/job-tpls/add",
      "/job-tpls/put",
      "/job-tpls/del",
      "/job-tasks",
      "/job-tasks/add",
      "/job-tasks/put",
      "/ibex-settings",
      "/users",
      "/user-groups",
      "/user-groups/add",
      "/user-groups/put",
      "/user-groups/del",
      "/permissions",
      "/busi-groups",
      "/busi-groups/add",
      "/busi-groups/put",
      "/busi-groups/del",
      "/metrics-built-in",
      "/builtin-metrics/add",
      "/builtin-metrics/put",
      "/builtin-metrics/del",
      "/built-in-components",
      "/built-in-components/add",
      "/built-in-components/put",
      "/built-in-components/del",
      "/help/variable-configs",
      "/help/version",
      "/help/servers",
      "/monitoring/help/source",
      "/help/sso",
      "/help/notification-tpls",
      "/help/notification-settings",
      "/help/migrate",
      "/site-settings"
    ],
    "err": ""
  };

  return Promise.resolve(JSON.parse(JSON.stringify(menuPermData)));
}

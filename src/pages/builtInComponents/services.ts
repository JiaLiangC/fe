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
import { Component, ComponentPost, ComponentPut, PayloadQuery, TypeEnum, Payload, PayloadPost, PayloadPut } from './types';

export type { Component, TypeEnum, Payload };

const API_PREFIX = '/api/v1/metrics';

export const getComponents = function (): Promise<Component[]> {
  return request(`${API_PREFIX}/builtin-components`, {
    method: RequestMethod.Get,
  }).then((res) => {
    return res.data;
  });
};

export const getCates = function (params: { component_id: number; type: TypeEnum }): Promise<string[]> {
  return request(`${API_PREFIX}/builtin-payloads/cates`, {
    method: RequestMethod.Get,
    params,
  }).then((res) => {
    return res.data;
  });
};

export const getPayloads = <T>(params: PayloadQuery): Promise<T> => {
  return request(`${API_PREFIX}/builtin-payloads`, {
    method: RequestMethod.Get,
    params,
  }).then((res) => {
    return res.data;
  });
};

export const getPayload = (id: number): Promise<{ content: string }> => {
  return request(`${API_PREFIX}/builtin-payload/${id}`, {
    method: RequestMethod.Get,
  }).then((res) => {
    return res.data;
  });
};

export const getPayloadByUUID = (uuid: number): Promise<{ content: string }> => {
  return request(`${API_PREFIX}/builtin-payload`, {
    method: RequestMethod.Get,
    params: { uuid },
  }).then((res) => {
    return res.data;
  });
};

export const postPayloads = (data: PayloadPost[]): Promise<any> => {
  return request(`${API_PREFIX}/builtin-payloads`, {
    method: RequestMethod.Post,
    data,
  }).then((res) => {
    return res.data;
  });
};

export const putPayload = (data: PayloadPut): Promise<any> => {
  return request(`${API_PREFIX}/builtin-payloads`, {
    method: RequestMethod.Put,
    data,
  }).then((res) => {
    return res.data;
  });
};

export const deletePayloads = (ids: number[]): Promise<any> => {
  return request(`${API_PREFIX}/builtin-payloads`, {
    method: RequestMethod.Delete,
    data: { ids },
  }).then((res) => {
    return res.data;
  });
};

export const postComponents = (data: ComponentPost[]): Promise<any> => {
  return request(`${API_PREFIX}/builtin-components`, {
    method: RequestMethod.Post,
    data,
  }).then((res) => {
    return res.data;
  });
};

export const putComponent = (data: ComponentPut): Promise<any> => {
  return request(`${API_PREFIX}/builtin-components`, {
    method: RequestMethod.Put,
    data,
  }).then((res) => {
    return res.data;
  });
};

export const deleteComponents = (ids: number[]): Promise<any> => {
  return request(`${API_PREFIX}/builtin-components`, {
    method: RequestMethod.Delete,
    data: { ids },
  }).then((res) => {
    return res.data;
  });
};

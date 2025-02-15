import request from '@/utils/request';
import { RequestMethod } from '@/store/common';

export const getN9eConfig = function (key: string) {
  return Promise.resolve('');
};

export const putN9eConfig = function (data: { ckey: string; cval: string }) {
  return request('/api/n9e/config', {
    method: RequestMethod.Put,
    data,
  });
};

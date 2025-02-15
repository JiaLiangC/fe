import _ from 'lodash';
import semver from 'semver';
import request from '@/utils/request';
import { RequestMethod } from '@/store/common';

export interface Versions {
  github_verison: string;
  version: string;
  newVersion: boolean;
}

export const getVersions = function (): Promise<Versions> {
  const versionData = {
    "dat": {
      "github_verison": "v3.0.0",
      "version": "v3.0.0"
    },
    "err": ""
  };

  return Promise.resolve(JSON.parse(JSON.stringify(versionData)));
};

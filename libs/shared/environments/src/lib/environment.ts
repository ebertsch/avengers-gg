import { URL_REWRITES } from './url-rewrites';
import { WHITE_LISTED_ENDPOINTS } from './white-listed-endpoints';

export const environment = {
  production: false,
  isServer: false,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "http://localhost:4200/api",
  readOnlyAPI: "false",
  protocol: "http",
  host: "localhost:4200",
  dataEntryClientApiUrl: "http://localhost:3333/api",
  apiPort: 3333,
  apiRewriter: URL_REWRITES,
  endPointsWhiteList: WHITE_LISTED_ENDPOINTS
};

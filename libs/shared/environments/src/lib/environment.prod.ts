import { URL_REWRITES } from './url-rewrites';
import { WHITE_LISTED_ENDPOINTS } from './white-listed-endpoints';

export const environment = {
  production: true,
  isServer: false,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "https://avengers-gg-data-prod.herokuapp.com/",
  readOnlyAPI: "true",
  protocol: "https",
  host: "www.avengersgg.com",
  dataEntryClientApiUrl: "https://avengers-gg-data-prod.herokuapp.com/",
  apiPort: 3333,
  apiRewriter: URL_REWRITES,
  endPointsWhiteList: WHITE_LISTED_ENDPOINTS
};

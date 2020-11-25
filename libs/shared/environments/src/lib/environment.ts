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
  apiPrefix: 'api',
  endPointsWhiteList: WHITE_LISTED_ENDPOINTS,
  firebaseConfig: {
    apiKey: "AIzaSyCvG8-5QFzj_xZ-voYd7D588JHH1kEnRi4",
    authDomain: "avengers-gg.firebaseapp.com",
    databaseURL: "https://avengers-gg.firebaseio.com",
    projectId: "avengers-gg",
    storageBucket: "avengers-gg.appspot.com",
    messagingSenderId: "697431604137",
    appId: "1:697431604137:web:18cb765e186624c03162b8",
    measurementId: "G-7GYN7YD1Y9"
  }
};

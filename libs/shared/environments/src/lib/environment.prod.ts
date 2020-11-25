import { URL_REWRITES } from './url-rewrites';
import { WHITE_LISTED_ENDPOINTS } from './white-listed-endpoints';

export const environment = {
  production: true,
  isServer: false,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "https://avengers-game-guide-data.herokuapp.com/",
  readOnlyAPI: "true",
  protocol: "https",
  host: "www.avengersgg.com",
  dataEntryClientApiUrl: "https://avengers-game-guide-data.herokuapp.com/",
  apiPort: 3333,
  apiRewriter: URL_REWRITES,
  apiPrefix: '',
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

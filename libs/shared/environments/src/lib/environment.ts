export const environment = {
  production: false,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "http://localhost:4200/api",
  apiPort: 3333,
  apiRewriter: {
    '/api/*': '/$1',
    '/hero/:heroId': '/heroes/:heroId'
  }
};

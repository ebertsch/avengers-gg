export const environment = {
  production: true,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "https://avengers-game-guide-data.herokuapp.com/",
  dataEntryClientApiUrl: "http://localhost:4200/api",
  apiPort: 3333,
  apiRewriter: {
    '/api/*': '/$1',
    '/hero/:heroId': '/heroes/:heroId',
    '/namedset': '/namedsets',
    '/namedset/:id': '/namedsets/:id'
  }
};

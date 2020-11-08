export const environment = {
  production: true,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "https://avengers-game-guide-data.herokuapp.com/",
  protocol: "https",
  host: "www.avengersgg.com",
  apiPort: 3333,
  apiRewriter: {
    '/api/*': '/$1',
    '/hero/:heroId': '/heroes/:heroId'
  }
};

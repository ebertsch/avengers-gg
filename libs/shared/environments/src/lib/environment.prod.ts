export const environment = {
  production: true,
  clientApiUrl: "https://avengers-game-guide-data.herokuapp.com/",
  apiPort: 3333,
  apiRewriter: {
    '/api/*': '/$1',
    '/hero/:heroId': '/heroes/:heroId'
  }
};

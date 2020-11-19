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
  apiRewriter: {
    '/api/*': '/$1',
    '/hero/:heroId': '/heroes/:heroId',
    '/namedset': '/namedsets',
    '/namedset/:id': '/namedsets/:id',
    '/perk': '/perks',
    '/perk/:id': '/perks/:id',
    '/guide': '/guides',
    '/guide/:id': '/guides/:id',
    '/note': '/notes',
    '/note/:id': '/notes/:id'
  }
};

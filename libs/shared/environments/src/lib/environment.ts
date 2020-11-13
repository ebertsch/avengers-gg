export const environment = {
  production: false,
  googleAnalyticsCode: 'G-VHNGDT7XX3',
  clientApiUrl: "http://localhost:4200/api",
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

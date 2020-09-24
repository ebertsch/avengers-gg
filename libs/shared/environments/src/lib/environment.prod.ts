export const environment = {
  production: true,
  apiPort: 3333,
  apiRewriter: {
    '/api/*': '/$1',
  }
};

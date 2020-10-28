// server.js
import * as jsonServer from 'json-server';
import { environment } from '@avengers-game-guide/shared/environments'
import * as path from 'path'
import {mergeJsonFiles} from './merge-extension';

(async () => {
  await mergeJsonFiles({source: './data', destination: './db.json'});

  const server = jsonServer.create()
  const router = jsonServer.router(path.join(__dirname, 'db.json'),  { foreignKeySuffix: 'Id' })
  const middleware = jsonServer.defaults()
  const rewriter = jsonServer.rewriter(environment.apiRewriter);

  server.use(rewriter);
  server.use(middleware)
  server.use(router)
  server.listen(process.env.PORT || environment.apiPort, () => console.log('JSON Server is running'))
})();
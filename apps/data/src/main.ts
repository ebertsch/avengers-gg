// server.js
import * as jsonServer from 'json-server';
import { environment } from '@avengers-game-guide/shared/environments'
import * as path from 'path'
import {mergeJsonFiles} from './merge-extension';
import saveToFiles from './save-data';

(async () => {
  await mergeJsonFiles({source: './data', destination: './db.json'});

  const server = jsonServer.create()
  const router = jsonServer.router(path.join(__dirname, 'db.json'),  { foreignKeySuffix: 'Id' })
  const middleware = jsonServer.defaults();
  const rewriter = jsonServer.rewriter(environment.apiRewriter);

  server.use(rewriter);
  server.use(middleware)

  let blockCheck = 'false'
  if(!!process.env.BLOCK) blockCheck = process.env.BLOCK
  else blockCheck = !environment.mutableAPI ? 'false' : 'true'

  // Add custom routes before JSON Server router
  if (blockCheck !== "false") {
    server.all('*', function (req, res, next) {
      if (req.method === 'GET') {
        next() // Continue
      } else {
        res.sendStatus(403) // Forbidden
      }
    })
  }

  server.post('/save', saveToFiles)

  server.use(router)
  server.listen(process.env.PORT || environment.apiPort, () => console.log('JSON Server is running'))
})();
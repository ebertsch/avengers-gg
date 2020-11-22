// server.js
import * as jsonServer from 'json-server';
import { environment } from '@avengers-game-guide/shared/environments'
import * as path from 'path'
import {mergeJsonFiles} from './merge-extension';
import saveToFiles from './save-data';
import { contains } from 'ramda';

(async () => {
  await mergeJsonFiles({source: './data', destination: './db.json'});

  const server = jsonServer.create()
  const router = jsonServer.router(path.join(__dirname, 'db.json'),  { foreignKeySuffix: 'Id' })
  const middleware = jsonServer.defaults();
  const rewriter = jsonServer.rewriter(environment.apiRewriter);

  server.use(rewriter);
  server.use(middleware)

  let readOnlyMode = 'true'
  if(!!process.env.BLOCK) readOnlyMode = process.env.BLOCK
  else readOnlyMode = environment.readOnlyAPI !== "false" ? 'true' : 'false'

  const isReadOnly = readOnlyMode === "true"
  // Add custom routes before JSON Server router
  if (isReadOnly) {
    server.all('*', function (req, res, next) {
      const containsEndpoint = contains<string>(req.path.toLowerCase())
      const isEndpointWhiteListed = containsEndpoint(environment.endPointsWhiteList);
      if (
        req.method === 'GET' || isEndpointWhiteListed
      ) {
        next() // Continue
      } else {
        res.status(403).send({path: req.path, isEndpointWhiteListed}) // Forbidden
      }
    })
  } else {
    server.post('/save', saveToFiles)
  }


  server.use(router)
  server.listen(process.env.PORT || environment.apiPort, () => console.log(`JSON Server is running${isReadOnly ? ' in READ_ONLY mode' : ' and is WRITE enabled'}`))
})();
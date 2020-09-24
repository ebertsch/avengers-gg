// server.js
import * as jsonServer from 'json-server';
import { environment } from '@avengers-game-guide/shared/environments'
import * as path from 'path'

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'),  { foreignKeySuffix: 'Id' })
const middleware = jsonServer.defaults()
const rewriter = jsonServer.rewriter(environment.apiRewriter);

server.use(rewriter);
server.use(middleware)
server.use(router)
server.listen(environment.apiPort, () => {
  console.log('JSON Server is running')
})
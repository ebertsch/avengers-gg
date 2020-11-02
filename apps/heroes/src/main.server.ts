import { enableProdMode } from '@angular/core';

import { environment } from '@avengers-game-guide/shared/environments';

if (environment.production) {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';

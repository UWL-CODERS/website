import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideClientHydration, withIncrementalHydration} from '@angular/platform-browser';
import {provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(withIncrementalHydration()),
  ],
};

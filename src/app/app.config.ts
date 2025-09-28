import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideClientHydration, withIncrementalHydration} from '@angular/platform-browser';
import {provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {routes} from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {CODERS_Preset} from '../presets/coders.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(withIncrementalHydration()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: CODERS_Preset,
      },
    }),
  ],
};

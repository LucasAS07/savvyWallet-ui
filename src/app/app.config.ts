import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import  Aura  from '@primeng/themes/aura';

import { routes } from './app.routes';
import { HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [ HttpClient,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    provideHttpClient(),
    DatePipe,
    ToastModule,
    MessageService,
    ConfirmDialogModule,
    ConfirmationService,
  ]
};

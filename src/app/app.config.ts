import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import  Aura  from '@primeng/themes/aura';

import { routes } from './app.routes';
import { HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SegurancaModule } from './seguranca/seguranca.module';
import { TranslateService, TranslateStore } from '@ngx-translate/core';


export const appConfig: ApplicationConfig = {
  providers: [ 
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
        }
    }),
    provideHttpClient(),
    DatePipe,
    ToastModule,
    MessageService,
    ConfirmDialogModule,
    ConfirmationService,
    {
      provide: JWT_OPTIONS,
      useValue: {} // ou suas opções personalizadas
    },
    // JwtModule should be imported in the AppModule instead of being added here
    JwtHelperService,
    SegurancaModule,
    TranslateStore,
    TranslateService
  ]
};

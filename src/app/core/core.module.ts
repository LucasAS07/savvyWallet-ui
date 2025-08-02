import { NgModule, LOCALE_ID} from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from '../seguranca/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { RelatoriosService } from '../relatorios/relatorios.service';

registerLocaleData(localePt, 'pt-BR');


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService,
    AuthService,
    TranslateService,
    RelatoriosService
  ]
})
export class CoreModule { }

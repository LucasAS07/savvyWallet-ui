import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CalendarModule,
    ButtonModule
  ]
})
export class RelatoriosModule { }

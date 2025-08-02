import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegurancaModule } from '../seguranca/seguranca.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SegurancaModule,
    ProgressSpinnerModule
  ],
})
export class LancamentosModule { }

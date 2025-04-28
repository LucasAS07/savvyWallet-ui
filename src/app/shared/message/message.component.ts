import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Message, MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgIf,MessageModule,Message, InputTextModule],
template: `
    <div *ngIf="temErro()" class="p-message p-message-error">
          <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">
            {{ text }}
          </p-message>
        </div>

`,
  styles: `
     .p-message-error {
      margin: 0;
      margin-top: 4px;
    }
  `
})
export class MessageComponent {
  @Input() error: string = '';
  @Input() control?: AbstractControl | FormControl | null;
  @Input() text: string = '';

  temErro(): boolean {
    return this.control? this.control.hasError(this.error) && this.control.dirty : true;
  }

}

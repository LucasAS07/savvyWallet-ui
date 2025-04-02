import { Component, Input } from '@angular/core';
import { FormControl} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgIf,MessageModule],
template: `
    <div ngIf="temErro()" class="p-message p-message-error">
          <p-message severity="error" icon="pi pi-times-circle" styleClass="mb-2">{{ text }}</p-message>
        </div>
  `,
  styles: ``
})
export class MessageComponent {
  @Input()error: string;
  @Input()contorl: FormControl;
  @Input()text: string;

  temErro(): boolean{
    return this.contorl.hasError(this.error) && this.contorl.dirty;
  }

}

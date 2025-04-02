import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  imports: [InputTextModule,InputNumberModule,
    ButtonModule, InputMaskModule
  ],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css'
})
export class PessoaCadastroComponent {

}

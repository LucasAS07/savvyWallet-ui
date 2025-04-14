import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

import { FormsModule, NgForm } from '@angular/forms';
import { MessageComponent } from '../../shared/message/message.component';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from '../../core/model';
import { MessageService } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, StyleClassModule,
    ButtonModule, InputMaskModule, MessageComponent, FormsModule],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css'
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

   salvar(pessoaForm: NgForm) {
      this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Pessoa cadastrado com sucesso!' })

        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro))
    }
}

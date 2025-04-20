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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, StyleClassModule,
    ButtonModule, InputMaskModule, MessageComponent, FormsModule,
    RouterModule],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css'
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    const codigoPessoa = this.router.snapshot.params['codigo'];

    if (codigoPessoa && codigoPessoa !== 'novo') {
      this.carregarPessoa(codigoPessoa)
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    salvar(pessoaForm: NgForm) {
      if (this.editando) {
        this.atualizarPessoa(pessoaForm);
      } else {
        this.adicionarPessoa(pessoaForm);
      }
    }

   adicionarPessoa(pessoaForm: NgForm) {
      this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Pessoa cadastrado com sucesso!' })

        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro))
    }

    atualizarPessoa(pessoaForm: NgForm) {
      this.pessoaService.atualizar(this.pessoa)
        .then(pessoa => {
          this.pessoa = pessoa;
          this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Pessoa atualizado com sucesso!' })
        })
        .catch(erro => this.errorHandler.handle(erro))
    }

    novo(form: NgForm){
      form.reset();

          setTimeout(() => {
            this.pessoa = new Pessoa();
          }, 1);

          this.route.navigate(['/pessoas/novo'])
    }

}

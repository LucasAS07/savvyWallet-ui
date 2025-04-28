import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

import { FormsModule, FormBuilder,
  Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MessageComponent } from '../../shared/message/message.component';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pessoa } from '../../core/model';
import { MessageService } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  imports: [InputTextModule, InputNumberModule, StyleClassModule,
    ButtonModule, InputMaskModule, MessageComponent, FormsModule,
    RouterModule,ReactiveFormsModule],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrl: './pessoa-cadastro.component.css'
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  formulario!: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private title: Title,
  ) { }

  ngOnInit() {
    const codigoPessoa = this.router.snapshot.params['codigo'];
    this.configurarFormulario();
    this.title.setTitle('Nova pessoa');

    if (codigoPessoa && codigoPessoa !== 'novo') {
      this.carregarPessoa(codigoPessoa)
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      nome: [null, [Validators.required, Validators.minLength(5)]],
      ativo: [true],
      endereco: this.formBuilder.group({
        logradouro: [null, [Validators.required, Validators.minLength(5)]],
        numero: [null, [Validators.required, Validators.minLength(1)]],
        complemento: [],
        bairro: [null, [Validators.required, Validators.minLength(5)]],
        cidade: [null, [Validators.required, Validators.minLength(5)]],
        estado: [null, [Validators.required]],
        cep: [null, [Validators.required]]
      })
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')?.value);  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    salvar() {
      if (this.editando) {
        this.atualizarPessoa();
      } else {
        this.adicionarPessoa();
      }
    }

   adicionarPessoa() {
      this.pessoaService.adicionar(this.formulario.value)
      .then(pessoaAdicionada => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Pessoa cadastrado com sucesso!' })

        // pessoaForm.reset();
        // this.pessoa = new Pessoa();
        this.route.navigate(['/pessoas', pessoaAdicionada.codigo])
      })
      .catch(erro => this.errorHandler.handle(erro))
    }

    atualizarPessoa() {
      this.pessoaService.atualizar(this.formulario.value)
        .then(pessoa => {
          this.pessoa = pessoa;
          this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Pessoa atualizado com sucesso!' })
          this.atualizarTituloEdicao();
        })
        .catch(erro => this.errorHandler.handle(erro))
    }

    novo() {
        this.formulario.reset();
        this.formulario.patchValue(new Pessoa())
        this.route.navigate(['pessoas/novo']);
      }

      atualizarTituloEdicao() {
        this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
      }

}

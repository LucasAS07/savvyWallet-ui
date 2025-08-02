import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';

import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { MessageComponent } from '../../shared/message/message.component';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Contato, Pessoa } from '../../core/model';
import { MessageService } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-pessoa-cadastro',
  standalone: true,
  imports: [
    InputTextModule,
    InputNumberModule,
    StyleClassModule,
    ButtonModule,
    InputMaskModule,
    MessageComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    PanelModule,
    TableModule,
    DialogModule,
    NgIf,
    DropdownModule,
  ],
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'], // corrigido
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();
  estados: any[] = [];
  cidades: any[] = [];
  formulario!: FormGroup;
  exibindoFormularioContato = false;
  contato!: Contato;
  estadoSelecionado?: number;
  contatoIndex!: number;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private title: Title
  ) {}

  ngOnInit() {
    const codigoPessoa = this.router.snapshot.params['codigo'];
    this.configurarFormulario();
    this.title.setTitle('Nova pessoa');
    this.carregarEstados();

    if (codigoPessoa && codigoPessoa !== 'novo') {
      this.carregarPessoa(codigoPessoa);
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
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cep: [null, [Validators.required]],
      }),
    });
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length; // Define o índice para o novo contato
  }

  confirmarContato(frm: NgForm) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);

    this.exibindoFormularioContato = false;
    frm.reset();
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index; // Define o índice do contato a ser editado
  }

  removerContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')?.value);
  }

 carregarPessoa(codigo: number) {
  this.pessoaService
    .buscarPorCodigo(codigo)
    .then((pessoa) => {
      // Extrair os códigos de estado e cidade do objeto
      const estadoCodigo = pessoa.endereco?.estado?.codigo;
      const cidadeCodigo = pessoa.endereco?.cidade?.codigo;

      // Atribuir os códigos ao lugar correto no formulário
      if (estadoCodigo) {
        this.formulario.get('endereco.estado')?.setValue(estadoCodigo);

        // Carregar cidades com base no estado e depois setar a cidade
        this.pessoaService.pesquisarCidades(estadoCodigo).then((cidades) => {
          this.cidades = cidades.map(c => ({
            label: c.nome,
            value: c.codigo
          }));

          this.formulario.get('endereco.cidade')?.setValue(cidadeCodigo);
        });
      }

      // Preencher os demais dados da pessoa
      this.formulario.patchValue({
        ...pessoa,
        endereco: {
          ...pessoa.endereco,
          estado: estadoCodigo, // garantir que é só o número
          // cidade será setado depois do carregamento das cidades
        }
      });

      this.pessoa = pessoa; // manter referência atualizada
      this.atualizarTituloEdicao();
    })
    .catch((erro) => this.errorHandler.handle(erro));
}

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
  const pessoaParaSalvar = {
    ...this.formulario.value,
    contatos: this.pessoa.contatos // adiciona os contatos corretamente
  };

  // garantir que cidade seja objeto com código
  if (typeof pessoaParaSalvar.endereco.cidade === 'number') {
    pessoaParaSalvar.endereco.cidade = {
      codigo: pessoaParaSalvar.endereco.cidade
    };
  }

  // remover o estado (caso você não precise enviar)
  delete pessoaParaSalvar.endereco.estado;

  this.pessoaService
    .adicionar(pessoaParaSalvar)
    .then((pessoaAdicionada) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Pessoa cadastrada com sucesso!',
      });

      this.route.navigate(['/pessoas', pessoaAdicionada.codigo]);
    })
    .catch((erro) => this.errorHandler.handle(erro));
}


  atualizarPessoa() {
    const pessoa = { ...this.formulario.value };

    if (pessoa.endereco?.cidade && typeof pessoa.endereco.cidade === 'number') {
      pessoa.endereco.cidade = { codigo: pessoa.endereco.cidade };
    }

    if (pessoa.endereco?.estado) {
      delete pessoa.endereco.estado;
    }

    this.pessoaService
      .atualizar(pessoa)
      .then((pessoaAtualizada) => {
        this.formulario.patchValue(pessoaAtualizada);
        this.pessoa = pessoaAtualizada; // manter referência atualizada
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Pessoa atualizada com sucesso!',
        });
        this.atualizarTituloEdicao();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();
    this.pessoa = new Pessoa();
    this.title.setTitle('Nova pessoa');
    this.route.navigate(['pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  carregarEstados() {
    this.pessoaService
      .listarEstados()
      .then((lista) => {
        this.estados = lista.map((uf) => ({ label: uf.nome, value: uf.codigo }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarCidades() {
  let estado = this.formulario.get('endereco.estado')?.value;

  // Se por acaso for um objeto, extrair o código
  if (estado && typeof estado === 'object') {
    estado = estado.codigo;
  }

  if (!estado) {
    console.warn('Estado não selecionado. Cancelando carregamento de cidades.');
    this.cidades = [];
    return;
  }

  this.pessoaService
    .pesquisarCidades(estado)
    .then((lista) => {
      this.cidades = lista.map((c) => ({ label: c.nome, value: c.codigo }));
    })
    .catch((erro) => this.errorHandler.handle(erro));
}
}

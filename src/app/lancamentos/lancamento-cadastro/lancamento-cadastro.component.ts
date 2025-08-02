import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormGroup, FormsModule, NgForm, FormBuilder, Validator,
  Validators, ReactiveFormsModule} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { MessageComponent } from '../../shared/message/message.component';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-lancamento-cadastro',
  standalone: true,
  imports: [InputTextModule, TextareaModule, ButtonModule,
    DatePickerModule, SelectButtonModule, SelectModule, RouterModule,
    InputNumberModule, FormsModule, MessageModule, MessageComponent, ReactiveFormsModule,
  FileUploadModule, CommonModule, ProgressSpinnerModule],

templateUrl: './lancamento-cadastro.component.html',
  styleUrl: './lancamento-cadastro.component.css'
})
export class LancamentoCadastroComponent implements OnInit {

  stateOptions: object[] = [
    {'label': 'Receita', value: 'RECEITA'},
    {'label': 'Despesa', value: 'DESPESA'},
  ];

  categorias: object[] = []
  pessoas: object[] = []
  // lancamento: Lancamento = new Lancamento();
  formulario!: FormGroup;
  uploadEmAndamento = false;

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private title: Title
  ){}

  ngOnInit(){
    this.carregarCategorias();
    this.carregarPessoas();
    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');
    const codigoLancamento = this.router.snapshot.params['codigo'];

    if (codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento)
    }
  }

  get uploadHeaders() {
    return this.lancamentoService.uploadHeaders();
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  aoTerminarUploadAnexo(event: any) {
    const anexo = event.originalEvent.body;
    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.url
    });
    this.uploadEmAndamento = false;
  }

  erroUpload() {
    this.messageService.add({ severity: 'error', summary: 'Erro ao enviar anexo',
      detail: 'Ocorreu um erro ao tentar enviar o anexo. Tente novamente.' });
    this.uploadEmAndamento = false;
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo')?.value;

    if (nome){
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }
    return '';
  }

  antesUploadAnexo() {
    this.uploadEmAndamento = true;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      valor: [null, Validators.required],
      observacao: [],
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      anexo: [],
      urlAnexo: []
    });

  }

  get editando(){
    return Boolean(this.formulario.get('codigo')?.value);
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento   => {
      this.formulario.patchValue(lancamento)
      if (this.formulario.get('urlAnexo')?.value)
          this.formulario.patchValue({
            urlAnexo: this.formulario.get('urlAnexo')?.value.replace('\\\\', 'https://')
          });
        this.atualizarTituloEdicao()
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(){
    if(this.editando){
      this.atualizarLancamento();
    }else{
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
    .then(lancamentoAdicionado => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Lançamento cadastrado com sucesso!' })

      // lancamentoForm.reset();
      // this.lancamento = new Lancamento();
      this.route.navigate(['/lancamentos', lancamentoAdicionado.codigo])
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {
      this.formulario.patchValue(lancamento)
      this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Lançamento atualizado com sucesso!' })
      this.atualizarTituloEdicao()
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  carregarCategorias(){
    this.categoriaService.listarTodas()
    .then(categorias =>{
      this.categorias = categorias.map((c: any) => ({ 'label': c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  carregarPessoas(){
    this.pessoaService.listarTodas()
    .then(pessoas =>{
      this.pessoas = pessoas.map((p: any) => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  novo() {
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.route.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')?.value}`)
  }

}

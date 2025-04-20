import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, NgForm} from '@angular/forms';
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


@Component({
  selector: 'app-lancamento-cadastro',
  standalone: true,
  imports: [InputTextModule, TextareaModule, ButtonModule,
    DatePickerModule, SelectButtonModule, SelectModule, RouterModule,
    InputNumberModule, FormsModule, MessageModule, MessageComponent],

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
  lancamento: Lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private router: ActivatedRoute,
    private route: Router
  ){}

  ngOnInit(){
    this.carregarCategorias();
    this.carregarPessoas();
    const codigoLancamento = this.router.snapshot.params['codigo'];

    if (codigoLancamento && codigoLancamento !== 'novo') {
      this.carregarLancamento(codigoLancamento)
    }
  }

  get editando(){
    return Boolean(this.lancamento.codigo)
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento   => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  salvar(form: NgForm){
    if(this.editando){
      this.atualizarLancamento(form)
    }else{
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Lançamento cadastrado com sucesso!' })

      // lancamentoForm.reset();
      // this.lancamento = new Lancamento();
      this.route.navigate(['/lancamentos', lancamentoAdicionado.codigo])
    })
    .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Lançamento atualizado com sucesso!' })
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

  novo(form: NgForm){
    form.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.route.navigate(['/lancamentos/novo'])
  }

}

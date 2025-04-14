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


@Component({
  selector: 'app-lancamento-cadastro',
  standalone: true,
  imports: [InputTextModule, TextareaModule, ButtonModule,
    DatePickerModule, SelectButtonModule, SelectModule,
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
    private messageService: MessageService
  ){}

  ngOnInit(){
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Lançamento cadastrado com sucesso!' })

      lancamentoForm.reset();
      this.lancamento = new Lancamento();
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
}

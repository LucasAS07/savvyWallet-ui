import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgFor, NgStyle } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lancamentos-pesquisa',
  standalone: true,
  imports: [InputTextModule, DatePickerModule,
    StyleClassModule, ButtonModule, NgStyle, RouterModule,
    TableModule, BadgeModule, DatePipe, CurrencyPipe,
    TooltipModule,FormsModule],
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrl: './lancamentos-pesquisa.component.css'
})
export class LancamentosPesquisaComponent implements OnInit{

  descricao = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  lancamentos: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirm: ConfirmationService,
    private errorHandler: ErrorHandlerService){}

  ngOnInit(): void {
      this.pesquisar();
  }

  pesquisar(): void{
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    }
    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => this.lancamentos = lancamentos)
      .catch(erro => this.errorHandler.handle(erro));
  }

    conditionalType(lancamentos: any){
      if(lancamentos.tipo === 'DESPESA') return {color: '#D76C82'}
      else return {color: 'green'}
    }

    confirmarExclucao(lancamento: any){
      this.confirm.confirm({
        message: 'Deseja Realmente Excluir?',
        accept: () => {
          this.excluir(lancamento)
        }
      })
    }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0){
          this.pesquisar();
        }else{
        this.grid.reset();
        }
        this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Lançamento excluído com sucesso!' })
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  


}

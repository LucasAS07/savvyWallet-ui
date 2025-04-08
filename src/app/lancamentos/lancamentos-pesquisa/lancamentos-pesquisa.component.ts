import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { FormsModule } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-lancamentos-pesquisa',
  standalone: true,
  imports: [InputTextModule, DatePickerModule,
    StyleClassModule, ButtonModule, NgStyle,
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

  constructor(private lancamentoService: LancamentoService){}

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
      .then(lancamentos => this.lancamentos = lancamentos);
  }

    conditionalType(lancamentos: any){
      if(lancamentos.tipo === 'DESPESA') return {color: '#D76C82'}
      else return {color: 'green'}
    }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();
      });
  }


}

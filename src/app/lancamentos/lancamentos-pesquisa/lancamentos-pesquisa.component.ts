import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { LancamentoGridComponent } from '../lancamento-grid/lancamento-grid.component';


@Component({
  selector: 'app-lancamentos-pesquisa',
  standalone: true,
  imports: [InputTextModule, DatePickerModule,
    StyleClassModule, ButtonModule,
    TableModule, BadgeModule,
    TooltipModule, LancamentoGridComponent],
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrl: './lancamentos-pesquisa.component.css'
})
export class LancamentosPesquisaComponent {

  lancamentos: object  [] = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017,6,30),
      dataPagamento: new Date(), valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2017,6,10),
      dataPagamento: new Date(2017,6,9), valor: 80000, pessoa: 'Atacado Brasil' },
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2017,7,20),
      dataPagamento: new Date(), valor: 14312, pessoa: 'Ministério da Fazenda' },
    { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017,6,5),
      dataPagamento: new Date(2017,5,30), valor: 800, pessoa: 'Escola Abelha Rainha' },
    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2017,8,18),
      dataPagamento: new Date(), valor: 55000, pessoa: 'Sebastião Souza' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2017,7,10),
      dataPagamento: new Date(2017,7,9), valor: 1750, pessoa: 'Casa Nova Imóveis' },
    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017,7,13),
      dataPagamento: new Date(), valor: 180, pessoa: 'Academia Top' }
  ]


}

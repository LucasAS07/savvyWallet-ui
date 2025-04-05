import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lancamento-grid',
  standalone: true,
  imports: [TableModule,NgStyle,BadgeModule,TooltipModule,DatePipe,CurrencyPipe,
    StyleClassModule,ButtonModule,InputTextModule
  ],
  templateUrl: './lancamento-grid.component.html',
  styleUrl: './lancamento-grid.component.css'
})
export class LancamentoGridComponent {

  @Input() lancamentos: any = [];

  conditionalType(lancamentos: any){
    if(lancamentos.tipo === 'DESPESA') return {color: '#D76C82'}
    else return {color: 'green'}
  }

}

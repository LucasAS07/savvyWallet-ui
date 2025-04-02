import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { NgModel } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-lancamento-cadastro',
  standalone: true,
  imports: [InputTextModule,TextareaModule,ButtonModule,
    DatePickerModule, SelectButtonModule, SelectModule,
    InputNumberModule
  ],

templateUrl: './lancamento-cadastro.component.html',
  styleUrl: './lancamento-cadastro.component.css'
})
export class LancamentoCadastroComponent {

  stateOptions: object[] = [
    {'label': 'Receita', value: 'RECEITA'},
    {'label': 'Despesa', value: 'DESPESA'},
  ];

  categorias: object[] = [
    {'label': 'Alimentação', value: '1'},
    {'label': 'Transporte', value: '2'},
  ]

  pessoas: object[] = [
    {'label': 'Lucas Rodrigues', value: '1'},
    {'label': 'Heitor Rodrigues', value: '2'},
    {'label': 'Miguel Rodrigues', value: '3'},
  ]

}

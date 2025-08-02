import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { NgForm } from '@angular/forms';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  standalone: true,
  imports: [FormsModule, CalendarModule, ButtonModule],
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrl: './relatorio-lancamentos.component.css'
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio?: Date;
  periodoFim?: Date;
  f? = FormGroup

  constructor(
    private relatoriosService: RelatoriosService
  ) {}

  ngOnInit() {}

  gerar() {
    this.relatoriosService.realtorioPorPessoa(this.periodoInicio!, this.periodoFim!)
    .then(relatorio => {
      if (relatorio) {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      } else {
        // Optionally handle the error case here
        console.error('Relatório não foi gerado.');
      }
    });
  }

}

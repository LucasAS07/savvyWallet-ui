import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DashboardService } from '../dashboard.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PanelModule, ChartModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  optionsPie = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: [
                '#FF9900', '#109618', '#990099', '#3B3EAC',
                '#0099C6', '#DD4477', '#3366CC', '#DC3912'
              ]
            }
          ]
        };
      });
  }

  configurarGraficoLinha() {
  this.dashboardService.lancamentosPorDia()
    .then(dados => {
      // Converte strings para Date
      dados.forEach(d => d.dia = new Date(d.dia));

      const diasDoMes = this.configurarDiasMes();

      // ⚠️ Corrigido de `tipo` para `tip`
      const totaisReceitas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tip === 'RECEITA'), diasDoMes);

      const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tip === 'DESPESA'), diasDoMes);

      this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC',
            backgroundColor: '#3366CC',
            fill: false,
            tension: 0.4,
            pointRadius: 4
          },
          {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00',
            backgroundColor: '#D62B00',
            fill: false,
            tension: 0.4,
            pointRadius: 4
          }
        ]
      };
    });
}


  private totaisPorCadaDiaMes(dados: any[], diasDoMes: number[]): number[] {
    const totais: number[] = [];

    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes(): number[] {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0); // Último dia do mês atual

    const quantidade = mesReferencia.getDate();
    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

}

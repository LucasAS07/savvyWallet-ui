import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgStyle } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-pessoa-pesquisa',
  standalone: true,
  imports: [InputTextModule,
    StyleClassModule,ButtonModule,
    TableModule, NgStyle, BadgeModule,
    TooltipModule],
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrl: './pessoa-pesquisa.component.css'
})
export class PessoaPesquisaComponent {
  pessoas: Object[] = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  ]

}

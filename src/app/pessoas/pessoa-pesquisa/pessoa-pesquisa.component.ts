import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-pessoa-pesquisa',
  standalone: true,
  imports: [InputTextModule,
  StyleClassModule, ButtonModule,
    TableModule, BadgeModule,
    TooltipModule, FormsModule],
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrl: './pessoa-pesquisa.component.css'
})
export class PessoaPesquisaComponent{

  nome = '';
  pessoas: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(private pessoaService: PessoaService){}

  ngOnInit(){
    this.pesquisar();
  }

  pesquisar(): void{
    const filtro: PessoaFiltro = {
      nome: this.nome
    }

    this.pessoaService.pesquisar(filtro)
      .then(pessoas => this.pessoas = pessoas);
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
      });
  }

}

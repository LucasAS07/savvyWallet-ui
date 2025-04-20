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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pessoa-pesquisa',
  standalone: true,
  imports: [InputTextModule, RouterModule,
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

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirm: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ){}

  ngOnInit(){
    this.pesquisar();
  }

  pesquisar(): void{
    const filtro: PessoaFiltro = {
      nome: this.nome
    }

    this.pessoaService.pesquisar(filtro)
      .then(pessoas => this.pessoas = pessoas)
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclucao(pessoa: any){
    this.confirm.confirm({
      message: 'Deseja Realmente Excluir?',
      accept: () => {
        this.excluir(pessoa)
      }
    })
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0){
          this.pesquisar();
        }else{
        this.grid.reset();
        }

        this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: 'Pessoa excluído com sucesso!' })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa: any): void{
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativado' : 'desativada';

      pessoa.ativo = novoStatus;
      this.messageService.add({ severity: 'success', summary: 'Sucesso' ,detail: `Pessoa ${acao} com sucesso!` })
    })
    .catch(erro => this.errorHandler.handle(erro))

  }

}

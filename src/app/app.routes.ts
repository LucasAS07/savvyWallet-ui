import { Routes } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

export const routes: Routes = [
  {path: '',redirectTo: 'lancamentos', pathMatch: 'full'},
  {path: 'lancamentos',component: LancamentosPesquisaComponent},
  {path: 'lancamentos/novo',component: LancamentoCadastroComponent},
  {path: 'lancamentos/:codigo',component: LancamentoCadastroComponent},

  {path: 'pessoas',component: PessoaPesquisaComponent},
  {path: 'pessoas/novo',component: PessoaCadastroComponent},
  {path: 'pessoas/:codigo',component: PessoaCadastroComponent},

  {path: 'pagina-nao-encontrada',component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}
];

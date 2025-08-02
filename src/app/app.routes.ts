import { Routes } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LoginComponent } from './seguranca/login/login.component';
import { AuthGuard } from './seguranca/auth.guard';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RelatorioLancamentosComponent } from './relatorios/relatorio-lancamentos/relatorio-lancamentos.component';

export const routes: Routes = [

  {path: '',redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'lancamentos',component: LancamentosPesquisaComponent, canActivate: [AuthGuard],
     data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']}},
  {path: 'lancamentos/novo',component: LancamentoCadastroComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },
  {path: 'lancamentos/:codigo',component: LancamentoCadastroComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_LANCAMENTO']}
  },

  {path: 'pessoas',component: PessoaPesquisaComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_PESSOA']}},
  {path: 'pessoas/novo',component: PessoaCadastroComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_PESSOA']}
  },
  {path: 'pessoas/:codigo',component: PessoaCadastroComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_CADASTRAR_PESSOA']},
  },

  {path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']},
  },

  {path: 'relatorios',component: RelatorioLancamentosComponent, canActivate: [AuthGuard],
    data: {roles: ['ROLE_PESQUISAR_LANCAMENTO']},
  },

  {path: 'login',component: LoginComponent},
  {path: 'nao-autorizado',component: NaoAutorizadoComponent},

  {path: 'pagina-nao-encontrada',component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada'}
];

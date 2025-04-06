import { Component } from '@angular/core';
import { NavbarComponent } from "./core/navbar/navbar.component";
import { Message } from 'primeng/message';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { PessoaPesquisaComponent } from "./pessoas/pessoa-pesquisa/pessoa-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LancamentosModule, NavbarComponent, PessoasModule,
    Message, PessoaPesquisaComponent, LancamentoCadastroComponent],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}

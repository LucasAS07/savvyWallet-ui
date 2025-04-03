import { Component } from '@angular/core';
import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PessoaPesquisaComponent } from "./pessoa-pesquisa/pessoa-pesquisa.component";
import { LancamentoCadastroComponent } from "./lancamento-cadastro/lancamento-cadastro.component";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { Message } from 'primeng/message';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LancamentosPesquisaComponent, NavbarComponent, PessoaPesquisaComponent, LancamentoCadastroComponent, PessoaCadastroComponent
    ,Message
  ],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}

import { Component } from '@angular/core';
import { LancamentosPesquisaComponent } from "./lancamentos-pesquisa/lancamentos-pesquisa.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PessoaPesquisaComponent } from "./pessoa-pesquisa/pessoa-pesquisa.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LancamentosPesquisaComponent, NavbarComponent, PessoaPesquisaComponent],
templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


}

import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../seguranca/auth.service';
import { NgIf } from '@angular/common';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgIf],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  exibindoMenu = false;
  usuarioLogado: string = '';

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload.nome;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private erroHndler: ErrorHandlerService,
  ){}

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

  logout(){
    this.auth.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => this.erroHndler.handle(erro));
  }


}

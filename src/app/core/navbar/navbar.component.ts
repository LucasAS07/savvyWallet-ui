import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../seguranca/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgIf],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  exibindoMenu = true;
  usuarioLogado: string = '';

  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload.nome;
  }

  constructor(private auth: AuthService){}

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }


}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface PessoaFiltro{
  nome: string;
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoa'

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    let params = new HttpParams();

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`,{headers, params})
    .toPromise()
    .then((respnse: any) => respnse['content']);

  }

  excluir(codigo: number): Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    return this.http.delete<void>(`${this.pessoaUrl}/${codigo}`, {headers})
    .toPromise();
  }

}

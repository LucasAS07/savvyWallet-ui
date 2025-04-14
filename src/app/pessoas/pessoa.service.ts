import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';

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

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoaUrl, { headers })
      .toPromise()
      .then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')

    return this.http.delete<void>(`${this.pessoaUrl}/${codigo}`, {headers})
    .toPromise();
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    .append('Content-Type', 'application/json')

    return this.http.put<void>(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.post<any>(this.pessoaUrl, pessoa, { headers })
      .toPromise();
  }

}

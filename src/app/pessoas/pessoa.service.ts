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
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

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
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(this.pessoaUrl, { headers })
      .toPromise()
      .then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.delete<void>(`${this.pessoaUrl}/${codigo}`, {headers})
    .toPromise();
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put<void>(`${this.pessoaUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.post<any>(this.pessoaUrl, pessoa, { headers })
      .toPromise();
  }

   atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
    .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this.http.put<Pessoa>(`${this.pessoaUrl}/${pessoa.codigo}`, pessoa, { headers })
          .toPromise()
          .then((response: any) => {
            return response;
          });
      }

      buscarPorCodigo(codigo: number): Promise<Pessoa> {
        const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this.http.get(`${this.pessoaUrl}/${codigo}`, { headers })
        .toPromise()
        .then((response: any) => {
          return response;
        });
      }


}

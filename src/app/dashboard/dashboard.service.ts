import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamento`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(`${this.lancamentosUrl}/estatistica/por-categoria`, { headers })
    .toPromise()
    .then((response: any) => response)
  }

  lancamentosPorDia(): Promise<Array<any>> {
    const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(`${this.lancamentosUrl}/estatistica/por-dia`, { headers })
      .toPromise()
      .then((response: any) => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      let offset = new Date().getTimezoneOffset() * 60000;

      dado.dia = new Date(dado.dia);
      dado.dia = new Date(new Date(dado.dia).getTime() + offset);
    }
  }

}

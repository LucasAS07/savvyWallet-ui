import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentoUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamento`;
  }

  realtorioPorPessoa(inicio: Date, fim: Date){
    const params = new HttpParams()
    .set('inicio', this.datePipe.transform(inicio, 'yyyy-MM-dd')!)
    .set('fim', this.datePipe.transform(fim, 'yyyy-MM-dd')!);

    const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(`${this.lancamentoUrl}/relatorio/por-pessoa`,{ params, responseType: 'blob', headers })
    .toPromise();
  }

}

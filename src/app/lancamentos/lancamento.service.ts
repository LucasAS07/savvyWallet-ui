import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';
import { firstValueFrom } from 'rxjs';


export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {


  lancamentoUrl = 'http://localhost:8080/lancamento'

  constructor(public http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
        params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { params})
    .toPromise()
    .then((response: any) => response['content']);

  }

  excluir(codigo: number): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.delete<void>(`${this.lancamentoUrl}/${codigo}`, {headers})
    .toPromise();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

      return firstValueFrom(
        this.http.post<Lancamento>(`${this.lancamentoUrl}`, lancamento, { headers })
      );
    }

    atualizar(lancamento: Lancamento): Promise<Lancamento> {
      const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

      return this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.codigo}`, lancamento, { headers })
        .toPromise()
        .then((response: any) => {
          this.converterStingParaDatas([response]);

          return response;
        });
    }

    buscarPorCodigo(codigo: number): Promise<Lancamento> {
      const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

      return this.http.get(`${this.lancamentoUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response: any) => {
        this.converterStingParaDatas([response]);

        return response;
      });
    }

    private converterStingParaDatas(lancamentos: Lancamento[]){
      for (const lancamento of lancamentos) {
        let offset = new Date().getTimezoneOffset() * 60000;

        lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

        if (lancamento.dataPagamento) {
          lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
        }
      }
    }
  }

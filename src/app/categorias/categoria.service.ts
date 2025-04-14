import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categoria'

    constructor(private http: HttpClient) { }

    listarTodas(): Promise<any> {
      const headers = new HttpHeaders().append(
        'Authorization',
        'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.get(this.categoriaUrl, { headers })
       .toPromise()
        // tslint:disable-next-line: no-string-literal
       .then(response => response); // substituindo response['content']
    }

}

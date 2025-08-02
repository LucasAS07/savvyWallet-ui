import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl: string;

    constructor(private http: HttpClient) {
        this.categoriaUrl = `${environment.apiUrl}/categoria` ;
     }

    listarTodas(): Promise<any> {
      const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${localStorage.getItem('token')}`);

      return this.http.get(this.categoriaUrl, { headers })
       .toPromise()
        // tslint:disable-next-line: no-string-literal
       .then(response => response); // substituindo response['content']
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_LIGAS, URL_ACTUALIZACIONES } from '../comun/link';
import { Liga } from '../modelos/ligas';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  resultado: any;

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarLigas(page: any, words: string) {
      let url = ""; 
      
      url = URL_LIGAS + '?page=' + page;       

      return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.leagues;
      }));    
  }

  cargarActualizaciones() {

    const url = URL_ACTUALIZACIONES + '/ver/' + 'todas';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.actualizaciones;
      }));
  }

  actualizarLiga(liga: Liga) {
    const url = URL_LIGAS + '/actualizar';

    return this.http.post( url, liga )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearLiga(liga: Liga) {
    const url = URL_LIGAS;

    return this.http.post( url, liga, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_DEPORTES, URL_EQUIPOS } from '../comun/link';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarDeportes() {
    const url = URL_DEPORTES;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.categories;
      }));
  }

  seleccionDeporte( id_categoria ) {
    const url = URL_DEPORTES + '/categoria/' + id_categoria;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.ligas;
      }));
  }

  cargarEquipos(liga: string) {

    const url = URL_EQUIPOS + '/equiposui/' + liga;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }
}

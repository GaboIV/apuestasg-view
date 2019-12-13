import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_DEPORTES, URL_EQUIPOS } from '../comun/link';
import { InicioSesionService } from './inicio-sesion.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarDeportes() {
    if (this._loginService.categories == null) {
      const url = URL_DEPORTES;
      return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        localStorage.setItem('categories', JSON.stringify(resp.categories));
        this._loginService.categories = resp.categories;
        return resp.categories;
      }));
    } else {
      return of(this._loginService.categories);
    }
  }

  cargarEquipos(liga: string) {

    const url = URL_EQUIPOS + '/equiposui/' + liga;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }
}

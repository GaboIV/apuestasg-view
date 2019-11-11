import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_NACIONALIDADES } from '../comun/link';
import { Nacionalidad } from '../modelos/nacionalidad';
import { InicioSesionService } from './inicio-sesion.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarNacionalidades() {
    if (this._loginService.countries == null) {
      const url = URL_NACIONALIDADES;
      return this.http.get( url, this._loginService.httpOptions )
        .pipe(map ( (resp: any) => {
          localStorage.setItem('countries', JSON.stringify(resp.countries));
          this._loginService.countries = resp.countries;
          return resp.countries;
        }));
    } else {
      return of(this._loginService.countries);
    }
  }

  actualizarNacionalidad(nacionalidad: Nacionalidad) {
    const url = URL_NACIONALIDADES + '/actualizar';

    return this.http.post( url, nacionalidad )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

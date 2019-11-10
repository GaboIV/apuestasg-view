import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_NACIONALIDADES } from '../comun/link';
import { Nacionalidad } from '../modelos/nacionalidad';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarNacionalidades() {
    const url = URL_NACIONALIDADES;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.countries;
      }));
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

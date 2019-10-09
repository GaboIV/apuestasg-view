import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_NACIONALIDADES } from '../comun/link';
import { Nacionalidad } from '../modelos/nacionalidad';

@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  constructor(
    private http: HttpClient,
  ) { }

  cargarNacionalidades() {
    const url = URL_NACIONALIDADES + '/ver/todos';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.nacionalidades;
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

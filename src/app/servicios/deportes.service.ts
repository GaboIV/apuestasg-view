import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_DEPORTES, URL_EQUIPOS } from '../comun/link';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  constructor(
    private http: HttpClient,
  ) { }

  cargarDeportes() {
    const url = URL_DEPORTES + '/ver/todos';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.deportes;
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

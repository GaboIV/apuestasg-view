import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TipoApuesta } from '../modelos/tipoApuesta';
import { URL_TIPOAPUESTAS } from '../comun/link';

@Injectable({
  providedIn: 'root'
})
export class TipoApuestaService {

  constructor(
    private http: HttpClient,
  ) { }

  cargarTipoApuestas() {
    const url = URL_TIPOAPUESTAS + '/ver/todos';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.tipoApuestas;
      }));
  }

  actualizarNacionalidad(tipoApuesta: TipoApuesta) {
    const url = URL_TIPOAPUESTAS + '/actualizar';

    return this.http.post( url, tipoApuesta )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

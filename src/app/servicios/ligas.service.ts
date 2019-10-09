import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_LIGAS, URL_ACTUALIZACIONES } from '../comun/link';
import { Liga } from '../modelos/ligas';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  resultado: any;

  constructor(
    private http: HttpClient,
  ) { }

  cargarLigas(pagina: number, criterio: string) {

    let url = '';

    if (criterio !== null) {
      url = URL_LIGAS + '/ver/' + pagina + '/' + criterio;
    } else {
      url = URL_LIGAS + '/ver/' + pagina + '/todas';
    }

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.ligas;
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
    const url = URL_LIGAS + '/agregar';

    return this.http.post( url, liga )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

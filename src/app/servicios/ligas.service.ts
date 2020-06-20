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

  cargarLigas(pagina: number, criterio: string, liga: string) {
      let url = ""; 

      if (criterio !== null) {
        url = URL_LIGAS + '?page=' + pagina + '&criterio=' + criterio;
      } else {
        url = URL_LIGAS + '?page=' + pagina;
      }   

      return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.leagues;
      }));    
  }

  cargarActualizaciones() {
    const url = URL_ACTUALIZACIONES;
    return this.http.get( url, this._loginService.httpOptions  )
      .pipe(map ( (resp: any) => {
        return resp.updates;
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

  modificarDatoLiga(id, value, parameter) {
    const url = URL_LIGAS + '/' + id;
    
    var key = parameter;
    var obj = {};
    obj[key] = value;

    return this.http.put( url, obj, this._loginService.httpOptions )
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

  seleccionDeportePais( id_categoria, id_pais ) {
    const url = URL_LIGAS + '/category/country';

    return this.http.post( url, { country_id : id_pais, category_id : id_categoria },this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      })
    );
  }

  sync(id) {
    const url = URL_LIGAS + "/" + id + "/sync";

    return this.http.post( url, {}, this._loginService.httpOptions  )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }
}

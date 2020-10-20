import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_PARTIDOS, URL_SELECCION, URL_RESULTADOS, URL_INICIAL, URL_PUBLIC } from '../comun/link';
import { map } from 'rxjs/operators';
import { Partido } from '../modelos/partido';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  resultado: any;

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarPartidos(pagina: number, criterio: string) {

    let url = '';

    // if (criterio !== null) {
    //   url = URL_PARTIDOS + '/ver/' + pagina + '/' + criterio;
    // } else {
    //   url = URL_PARTIDOS + '/ver/' + pagina + '/todos';
    // }

    url = URL_PARTIDOS + '?page=' + pagina;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.games;
      }));
  }

  cargarPartido(id: number) {

    let url = '';

    url = URL_PARTIDOS + '/' + id;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.game;
      }));
  }

  filtrarPartidos(pagina: number, category_id, country_id, start, criterio) {
    let url = URL_PARTIDOS + '/byFilters?page=' + pagina;

    return this.http.post( url, { category_id: category_id, country_id:country_id, start: start, name : criterio }, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  filtrarPartidosResult(pagina: number, category_id, country_id, start, criterio) {
    let url = URL_RESULTADOS + '/gamesByFilters?page=' + pagina;

    return this.http.post( url, { category_id: category_id, country_id:country_id, start: start, name : criterio }, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  filtrarCarrerasResult(category_id, start, id: null) {
    let url = URL_RESULTADOS + '/careersByFilters';

    return this.http.post( url, { category_id: category_id, start: start, id: id }, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarDestacados() {
    const url = URL_PUBLIC + 'showgamesoutstanding';
    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.outstanding;
      }));
  }

  partidosPorCategoria ( id: string, dato: string, equipo: string ) {
    let url = URL_PUBLIC + 'showgames/' + id;

    if (dato == '24' || dato == 'today') {
      url = url + "?radio=" + dato
    }

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  actualizarPartido( partido: Partido ) {
    const url = URL_PARTIDOS + '/actualizar';

    return this.http.post( url, partido )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  actualizarEstado( id, estatus ) {
    const url = URL_PARTIDOS + '/updateOutstanding/' + id;

    return this.http.put( url, { "outstanding": estatus }, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  seleccionDeporte ( id_categoria ) {
    const url = URL_RESULTADOS + '/deporte/' + id_categoria;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.ligas;
      }));
  }

  seleccionLiga ( id_liga ) {
    const url = URL_RESULTADOS + '/liga/' + id_liga;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.partidos;
      }));
  }

  seleccionHipodromo ( id_hipodromo ) {
    const url = URL_RESULTADOS + '/hipodromo/' + id_hipodromo;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.carreras;
      }));
  }

  enviarRL ( id_partido, id_categoria, id_ta, resultado ) {
    const url = URL_RESULTADOS;

    return this.http.post( url, { game_id : id_partido, bet_type_id : id_ta, category_id : id_categoria, result : resultado }, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  enviarResult ( id_partido, data ) {
    const url = URL_RESULTADOS;

    return this.http.post( url, { game_id : id_partido, data : data }, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  enviarCB ( id_carrera, resultado ) {
    const url = URL_RESULTADOS + 'hipism';

    return this.http.post( url, { game_id : id_carrera, bet_type_id : '99', category_id : '7', result : resultado }, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  guardarDatos ( pitchers, partido ) {
    const url = URL_PARTIDOS + "/" + partido.id;

    return this.http.put( url, { pitchers, partido }, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearPartido ( partido: Partido ) {
    const url = URL_PARTIDOS;

    return this.http.post( url, partido, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  cargarEnVivo () {
    const url = URL_PARTIDOS + '/ver/live';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  anularPartido( partido: Partido ) {
    const url = URL_PARTIDOS + '/anular';

    return this.http.post( url, partido )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  partidosPorBusqueda ( id: string, dato: string, equipo: string ) {
    const url = URL_PUBLIC + 'games/byName?page=1'

    return this.http.post( url, { name : equipo }, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  sendSectionsResult ( id_partido, data ) {
    const url = URL_RESULTADOS;

    return this.http.post( url, { game_id : id_partido, data : data }, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

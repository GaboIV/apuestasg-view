import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_PARTIDOS, URL_SELECCION, URL_RESULTADOS, URL_INICIAL } from '../comun/link';
import { map } from 'rxjs/operators';
import { Partido } from '../modelos/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  resultado: any;

  constructor(
    private http: HttpClient,
  ) { }

  cargarPartidos(pagina: number, criterio: string) {

    let url = '';

    if (criterio !== null) {
      url = URL_PARTIDOS + '/ver/' + pagina + '/' + criterio;
    } else {
      url = URL_PARTIDOS + '/ver/' + pagina + '/todos';
    }

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.partidos;
      }));
  }

  cargarDestacados() {

    const url = URL_PARTIDOS + '/ver/destacados';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.destacados;
      }));
  }

  partidosPorCategoria ( id: string, dato: string, equipo: string ) {
    const url = URL_INICIAL + 'showgames/' + id;

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
    const url = URL_RESULTADOS + '/agregar';

    return this.http.post( url, {id_partido, id_ta, id_categoria, resultado} )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  enviarCB ( id_carrera, resultado ) {
    const url = URL_RESULTADOS + '/agregar2';

    return this.http.post( url, {id_carrera, resultado} )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  guardarDatos ( pitchers, partido ) {
    const url = URL_PARTIDOS + '/agregarDatos';

    return this.http.post( url, { pitchers, partido } )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearPartido ( partido: Partido ) {
    const url = URL_PARTIDOS + '/crear';

    return this.http.post( url, partido )
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
}

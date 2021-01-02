import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_EQUIPOS } from '../comun/link';
import { Equipo } from '../modelos/equipos';
import { InicioSesionService } from './inicio-sesion.service';


@Injectable()
export class EquiposService {

  resultado: any;

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarEquipos(pagina: number, criterio: string, liga: string) {

    let url = '';

    if (criterio !== null) {
      url = URL_EQUIPOS + '?page=' + pagina + '&criterio=' + criterio;
    } else {
      url = URL_EQUIPOS + '?page=' + pagina;
    }

    if (liga) {
      url += "&league_id=" + liga;
    }

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp.teams;
      }));
  }

  cargarEquiposPorLiga (id: any) {
    const url = URL_EQUIPOS + '/byleague/' + id;

    return this.http.get( url,this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      })
    );
  }

  actualizarEquipo(equipo: Equipo) {
    const url = URL_EQUIPOS + '/actualizar';

    return this.http.post( url, equipo )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  modificarDatoEquipo(id, value, parameter) {
    const url = URL_EQUIPOS + '/' + id;
    
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

  subirImagen( equipo: Equipo, selectedFile: File ) {
    const uploadData = new FormData();
    uploadData.append('myFile', selectedFile, selectedFile.name);
    return this.http.post('http://localhost/bzbk/public/subida_logos.php?id=' + equipo.id_equipo, uploadData)
      .pipe(map ( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

}

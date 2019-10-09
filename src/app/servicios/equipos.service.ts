import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_EQUIPOS } from '../comun/link';
import { Equipo } from '../modelos/equipos';


@Injectable()
export class EquiposService {

  resultado: any;

  constructor(
    private http: HttpClient,
  ) { }

  cargarEquipos(pagina: number, criterio: string, liga: string) {

    let url = '';

    if (criterio !== null) {
      url = URL_EQUIPOS + '/ver/' + pagina + '/' + criterio + '/' + liga;
    } else {
      url = URL_EQUIPOS + '/ver/' + pagina + '/todos/' + '/' + liga;
    }

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.equipos;
      }));
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

import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import {  URL_JUGADORES, URL_REGISTRO } from '../comun/link';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  crearUsuario(usuario) {
    const url = URL_REGISTRO;

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  activarUsuario(cod_act) {
    const url = URL_JUGADORES + '/activar/' + cod_act;

    return this.http.post( url, cod_act )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

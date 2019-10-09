import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { URL_USUARIOS } from '../comun/link';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  crearUsuario(usuario: Usuario) {
    const url = URL_USUARIOS + '/crear';

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  activarUsuario(cod_act) {
    const url = URL_USUARIOS + '/activar/' + cod_act;

    return this.http.post( url, cod_act )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

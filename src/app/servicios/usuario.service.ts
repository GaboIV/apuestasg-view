import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { 
  URL_JUGADORES, 
  URL_REGISTRO,
  URL_DEPOSITO,
  URL_TRANSACCION
  } from '../comun/link';
import { map } from 'rxjs/operators';
import { Pago } from '../modelos/pago.modelo';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  obtenertransacciones (page: number) {
    const url = URL_TRANSACCION + "?page=" + page;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  obtenerpagos (page: number) {
    const url = URL_DEPOSITO + "?page=" + page;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

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

  modificarDatosPersonal (player) {
    const url = URL_JUGADORES + '/updates/personal';

    return this.http.put( url, player, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  modificarDatosComplementario(player) {
    const url = URL_JUGADORES + '/updates/complement';

    return this.http.put( url, player, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearPago(pago: Pago) {
    const url = URL_JUGADORES + "/pays";

    pago.register_date = pago.register_date + " " + pago.registro;

    return this.http.post( url, pago, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

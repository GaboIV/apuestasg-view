import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  URL_FECHA,
  URL_DEPOSITO,
  URL_CHANGELOG,
  URL_IMAGEN,
  URL_INICIAL,
  URL_ACCOUNT,
  URL_BANK,
  URL_PUBLIC,
  URL_NACIONALIDADES
  } from '../comun/link';
import { Pago } from '../modelos/pago.modelo';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  public largoVentana: any;
  public largoCentral: any;

  public leaguesSelected = [];
  public leaguesCount = 0;

  fecha: any;

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  subirImagen( id: string, selectedFile: File, carpeta ) {
    const uploadData = new FormData();
    uploadData.append('image', selectedFile);
    uploadData.append('id', id);
    uploadData.append('model', carpeta);
    return this.http.post( URL_IMAGEN, uploadData)
      .pipe(map ( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  cargarCategoriasJuegos() {
    const url = URL_PUBLIC + 'showgamesbycategory';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  recibirHora() {
    const url = URL_FECHA;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        this.fecha = resp.fecha;
        return resp.fecha;
      }));
  }

  query() {
     this.largoVentana = window.innerHeight;
     this.largoCentral = this.largoVentana;
     this.largoCentral += 'px';

     $(window).resize( () => {
       this.largoVentana = window.innerHeight;
       this.largoCentral = this.largoVentana;
       this.largoCentral += 'px';
      });
  }

  cargarCuentas () {
    const url = URL_ACCOUNT;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.accounts;
      }));
  }

  cargarBancos () {
    const url = URL_BANK;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.banks;
      }));
  }

  cargarPagos ( ) {
    const url = URL_DEPOSITO + '';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.pagos;
      }));
  }

  cargarChangelog ( dato ) {
    const url = URL_CHANGELOG;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  agregarTarea(tarea, id_usuario) {
    const url = URL_CHANGELOG;

    return this.http.post( url, {text: tarea, user_id: id_usuario}, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  actualizarEstatusTarea(id_cl) {
    const url = URL_CHANGELOG + '/actualizar';

    return this.http.post( url, { id_cl } )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  actualizarPago(id_pago, estatus) {
    const url = URL_DEPOSITO + '/pago/actualizar';

    return this.http.post( url, { id_pago, estatus } )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  modificarDatoPais(id, value, parameter) {
    const url = URL_NACIONALIDADES + '/' + id;

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

  getCategorySidebar() {
    const url = URL_PUBLIC + 'sidebar';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  getGamesByLeague(league_id) {
    const url = URL_PUBLIC + 'games/byleague/' + league_id;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        const categoryIndex = this.leaguesSelected.findIndex(categories => categories.id === resp.category.id);

        if (categoryIndex != -1) {
          this.leaguesSelected[categoryIndex].leagues.push(resp)
        } else {
          this.leaguesSelected.push(
            {
              "id": resp.category.id,
              "name": resp.category.name,
              "image": resp.category.image,
              "leagues": [resp]
            }
          )
        }
        return resp;
      }));
  }
}

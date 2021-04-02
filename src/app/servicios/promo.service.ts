import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_PUBLIC } from '../comun/link';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  getNextPromo(group) {
    const url = URL_PUBLIC + 'promos/next?promo=' + group;

    return this.http.get( url, this._loginService.httpOptions)
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  addSelection(group, number) {
    const url = URL_PUBLIC + 'promos/next?promo=' + group;

    return this.http.post( url, { selection: number }, this._loginService.httpOptions)
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }
}

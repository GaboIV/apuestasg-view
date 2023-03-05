import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_DEPOSITO, URL_PAYMENT, } from '../comun/link';
import { map } from 'rxjs/operators';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  get (page: number) {
    const url = URL_PAYMENT + "?page=" + page;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        return resp;
      })
    );
  }

  changeStatus(payment, value) {
    const url = URL_PAYMENT + "/" + payment.id + '/change-status';

    return this.http.patch( url, { status: value }, this._loginService.httpOptions)
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }
}

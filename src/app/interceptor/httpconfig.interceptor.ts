import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { InicioSesionService } from '../servicios/inicio-sesion.service';
import { Usuario } from '../modelos/usuario';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  static LoginService;
  constructor( public router: Router, _loginService: InicioSesionService ) {
    HttpErrorInterceptor.LoginService = _loginService;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          HttpErrorInterceptor.LoginService.esperandologion = false;
          HttpErrorInterceptor.LoginService.loading = false;
          let errorMessage = '';
          let message = 'Sesión expirada';
          if (error.error instanceof ErrorEvent) {
            // client-side error
          } else {
            console.log(error.error);
            // server-side error
            errorMessage = `${error.error.error}`;

            if (errorMessage === 'undefined') {
              errorMessage = `${error.error.message}`;
            }

            if (errorMessage === 'Undefined offset: 2' || errorMessage === 'Undefined offset: 1') {
              errorMessage = "Error en los datos enviados. Posiblemente las coordenadas de ubicación."
            }

            if (errorMessage.indexOf("file_get_contents") == 0) {
              errorMessage = "Error en los datos enviados. Posiblemente las coordenadas de ubicación."
            }
          }

          if (error.status === 401) {
           
            localStorage.removeItem('token');
            localStorage.removeItem('menu');
            localStorage.removeItem('usuario');
            localStorage.removeItem('id');

            // tslint:disable-next-line:max-line-length
            HttpErrorInterceptor.LoginService.usuario = new Usuario(
              '', 
              '', 
              null, 
              1, 
              '', 
              {
              id: '',
              document_type: '',
              document_number: null,
              name: '',
              lastname: '',
              birthday: '',
              gender: '',
              country_id: null,
              state_id: '',
              city_id: null,
              parish_id: null,
              address: '',
              phone: '',
              treatment: '',
              available: '',
              risk: '',
              points: '',
              ip: '',
              browser: '',
              created_at: '',
              updated_at: '' 
              }, 
              '', 
              null
            );
            HttpErrorInterceptor.LoginService.estatus = 'noSesion';
            HttpErrorInterceptor.LoginService.salirMenu();

            HttpErrorInterceptor.LoginService.selecciones = [];
            HttpErrorInterceptor.LoginService.selecciones2 = [];

            HttpErrorInterceptor.LoginService.user = null;
            HttpErrorInterceptor.LoginService.token = '';
            HttpErrorInterceptor.LoginService.code = '';
            HttpErrorInterceptor.LoginService.type = 'admin';

            this.router.navigate(['/importantes/1']);
            swal({
              type: 'error',
              title: 'Error:',
              text: message
            })            
          } else {
            swal({
              type: 'error',
              title: 'Error en la solicitud',
              html: errorMessage
            })
          }
          return throwError(errorMessage);
        })
      )
  }
}
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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  static LoginService;
  constructor( public router: Router, _loginService: InicioSesionService ) {
    HttpErrorInterceptor.LoginService = _loginService;
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          HttpErrorInterceptor.LoginService.loading = false;
          let errorMessage = '';
          let message = 'Acceso no autorizado';
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
            localStorage.removeItem('user');      
            localStorage.removeItem('id');      
            localStorage.removeItem('code'); 

            HttpErrorInterceptor.LoginService.user = null;
            HttpErrorInterceptor.LoginService.token = '';
            HttpErrorInterceptor.LoginService.code = '';
            HttpErrorInterceptor.LoginService.type = 'admin';

            this.router.navigate(['/login']);
            swal({
              type: 'error',
              title: 'Error:',
              text: message,
              footer: 'Verifica tus datos e intenta iniciar sesión nuevamente'
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
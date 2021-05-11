import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InicioSesionService } from '../servicios/inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(
    public _inicioSesion: InicioSesionService
  ) { }

  canActivate( ) {
    if ( this._inicioSesion.usuario.status == 1 ) {
      return true;
    } else {
      console.log( 'Bloqueado por el ADMIN GUARD');
      return false;
    }
  }
}

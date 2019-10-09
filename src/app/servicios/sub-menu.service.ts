import { Injectable } from '@angular/core';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {

  menu: any;

  constructor(
    public _inicioSesion: InicioSesionService
  ) { }

  cargarMenu() {
    this._inicioSesion.cargarMenuLocal();
    this.menu = this._inicioSesion.menu;
  }
}

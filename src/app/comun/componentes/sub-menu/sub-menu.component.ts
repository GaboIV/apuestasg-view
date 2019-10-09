import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralesService } from '../../../servicios/generales.service';
import * as $ from 'jquery';
import { SubMenuService } from '../../../servicios/servicios.indice';
import { InicioSesionService } from '../../../servicios/inicio-sesion.service';
import { Usuario } from '../../../modelos/usuario';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styles: []
})
export class SubMenuComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public router: Router,
    public _generalService: GeneralesService,
    public _inicioSesion: InicioSesionService,
    public _subMenuService: SubMenuService
  ) { }

  ngOnInit() {
    this.usuario = this._inicioSesion.usuario;

    if ( this.usuario !== undefined) {
      this._subMenuService.cargarMenu();
    }
  }

  mostrarAlert( mensaje ) {
    $('#toolOpt').html(mensaje);
  }
}
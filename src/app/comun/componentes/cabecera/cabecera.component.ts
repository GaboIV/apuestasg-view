import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../../servicios/generales.service';
import { InicioSesionService } from '../../../servicios/inicio-sesion.service';
import { Usuario } from '../../../modelos/usuario';
import * as $ from 'jquery';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { SubMenuService } from '../../../servicios/sub-menu.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  fecha: any;
  hora: any;
  token = '';
  usuario: Usuario;

  constructor(
    public _generalesService: GeneralesService,
    public _sesionUsuario: InicioSesionService,
    public _subMenuService: SubMenuService
  ) {
    setInterval(() => { this.actualizarHora(); }, 1000);
  }

  ngOnInit() {
    this.recibirHora();
    this.sesionActiva();
    this._generalesService.query();
  }

  recibirHora() {
    this._generalesService.recibirHora()
          .subscribe( fecha => this.fecha = fecha );
  }

  actualizarHora() {
    const date = new Date( this.fecha );
    date.setSeconds(date.getSeconds() + 1);
    this.hora = this.formatAMPM( date );
    this.fecha = date;
    this._generalesService.fecha = this.fecha;
  }

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
  }

  loginUsuario( event ) {
    event.preventDefault();
    const tarjeta = event.target;
    const usuario = tarjeta.querySelector('#usuario').value;
    const contrasena = tarjeta.querySelector('#contrasena').value;
    this._sesionUsuario.obtenerUsuario( usuario, contrasena, 'contrasena')
    .subscribe( res => {
      if (res.status === 'correcto') {
        this._subMenuService.cargarMenu();
        this._sesionUsuario.estatus = 'Sesion';
        this._sesionUsuario.usuario = res.usuario;
        this._sesionUsuario.guardarUsuario(res.usuario.id_usuario, res.usuario.token, res.usuario.usuario);
        this._sesionUsuario.obtenerSelecciones().subscribe();
      }
    });
  }

  logout() {
    this.usuario = new Usuario('', '', null, '0', '', '0', '', '0', '2', '', '', '', '', '231', '', '', '', '', '5', '', '', '', '1', '');
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    // tslint:disable-next-line:max-line-length
    this._sesionUsuario.usuario = new Usuario('', '', null, '0', '', '0', '', '0', '2', '', '', '', '', '231', '', '', '', '', '5', '', '', '', '1', '');
    this._sesionUsuario.estatus = 'noSesion';
    this._sesionUsuario.salirMenu();

    this._sesionUsuario.selecciones = [];
    this._sesionUsuario.selecciones2 = [];
  }

  sesionActiva() {
      this._sesionUsuario.recogerSesion();
      if ( this._sesionUsuario.usuario.usuario !== undefined) {
        this._sesionUsuario.obtenerUsuario( this._sesionUsuario.usuario.usuario, this._sesionUsuario.usuario.token, 'token')
        .subscribe( res => {
          if (res.status === 'correcto') {
            this._subMenuService.cargarMenu();
            this._sesionUsuario.estatus = 'Sesion';
            this._sesionUsuario.usuario = res.usuario;
            this._sesionUsuario.guardarUsuario(res.usuario.id_usuario, res.usuario.token, res.usuario.usuario);
          }
        });
      }
    }
}

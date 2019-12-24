import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../../servicios/generales.service';
import { InicioSesionService } from '../../../servicios/inicio-sesion.service';
import { Usuario } from '../../../modelos/usuario';
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
      if (res.access_token) {
        this._subMenuService.cargarMenu();
        this._sesionUsuario.estatus = 'Sesion';
        this._sesionUsuario.usuario = res.user;
        this._sesionUsuario.guardarUsuario(res.user.id, res.access_token, res.user.nick);
        this._sesionUsuario.obtenerSelecciones().subscribe();
      }
    });
  }

  logout() {
    this.usuario = new Usuario(
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

    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    // tslint:disable-next-line:max-line-length
    this._sesionUsuario.usuario = new Usuario(
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
    this._sesionUsuario.estatus = 'noSesion';
    this._sesionUsuario.salirMenu();

    this._sesionUsuario.selecciones = [];
    this._sesionUsuario.selecciones2 = [];

    this._sesionUsuario.ticketes = null;
    this._sesionUsuario.ticketes2 = null;
  }

  sesionActiva() {
      this._sesionUsuario.recogerSesion();
      if ( this._sesionUsuario.usuario.nick !== undefined && this._sesionUsuario.usuario.nick !== '' ) {
        this._sesionUsuario.obtenerUsuario( this._sesionUsuario.usuario.nick, this._sesionUsuario.token, 'token')
        .subscribe( res => {
          if (res.status === 'correcto') {
            this._subMenuService.cargarMenu();
            this._sesionUsuario.estatus = 'Sesion';
            this._sesionUsuario.usuario = res.user;
            this._sesionUsuario.guardarUsuario(res.usuario.id, res.access_token, res.usuario.nick);
          }
        });
      }
    }
}

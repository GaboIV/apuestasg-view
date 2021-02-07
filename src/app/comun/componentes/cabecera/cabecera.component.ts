import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../../servicios/generales.service';
import { InicioSesionService } from '../../../servicios/inicio-sesion.service';
import { Usuario } from '../../../modelos/usuario';
import { SubMenuService } from '../../../servicios/sub-menu.service';
import swal from 'sweetalert2';
import { ModalService } from 'src/app/servicios/modal.service';
import { SamplemodalComponent } from 'src/app/modales/samplemodal/samplemodal.component';
import { WinHourlyComponent } from 'src/app/modales/winhourly/winhourlymodal.component';


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
  vermenuuser = false;
  esperando = false;

  constructor(
    public _generalesService: GeneralesService,
    public _sesionUsuario: InicioSesionService,
    public _subMenuService: SubMenuService,
    public _modalService: ModalService,
  ) {
    setInterval(() => { this.actualizarHora(); }, 15000);

    setInterval(() => { this.recibirHora(); }, 150000);
  }

  ngOnInit() {
    this.recibirHora();
    this.sesionActiva();
    this._generalesService.query();
  }

  recibirHora() {
    this._generalesService.recibirHora()
      .subscribe(fecha => this.fecha = fecha * 1000);
  }

  actualizarHora() {
    const date = new Date(this.fecha);
    date.setSeconds(date.getSeconds() + 1);

    this.fecha = date;
    this._generalesService.fecha = this.fecha;
  }

  loginUsuario(event) {
    this._sesionUsuario.esperandologion = true;
    event.preventDefault();
    const tarjeta = event.target;
    const usuario = tarjeta.querySelector('#usuario').value;
    const contrasena = tarjeta.querySelector('#contrasena').value;
    if (usuario == '' || contrasena == '') {
      this._sesionUsuario.esperandologion = false;
      return;
    }
    this._sesionUsuario.obtenerUsuario(usuario, contrasena, 'contrasena')
      .subscribe(res => {
        if (res.access_token) {
          this._subMenuService.cargarMenu();
          this._sesionUsuario.estatus = 'Sesion';
          this._sesionUsuario.usuario = res.user;
          this._sesionUsuario.guardarUsuario(res.user.id, res.access_token, res.user.nick);
          this._sesionUsuario.obtenerSelecciones().subscribe();
          this._sesionUsuario.esperandologion = false;
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
    if (this._sesionUsuario.usuario.nick !== undefined && this._sesionUsuario.usuario.nick !== '') {
      this._sesionUsuario.obtenerUsuario(this._sesionUsuario.usuario.nick, this._sesionUsuario.token, 'token')
        .subscribe(res => {
          if (res.status === 'correcto') {
            this._subMenuService.cargarMenu();
            this._sesionUsuario.estatus = 'Sesion';
            this._sesionUsuario.usuario = res.user;
            this._sesionUsuario.guardarUsuario(res.usuario.id, res.access_token, res.usuario.nick);
          }
        });
    }
  }

  toglevermenuuser() {
    this.vermenuuser = !this.vermenuuser;
  }

  recogerSesion() {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    toast({
      type: "info",
      title: "Actualizando datos de usuario"
    });
    this._sesionUsuario.obtenerUsuario(this._sesionUsuario.usuario.nick, '', 'token')
      .subscribe(resp => {
        swal.close();
      });
  }

  showModal(): void {
    this._modalService.showModal(WinHourlyComponent, {
      allowOverlayClick: true,
      showCloseButton: false,
      data: {
        modalTitle: 'This is the sample modal'
      }
    });
  }
}

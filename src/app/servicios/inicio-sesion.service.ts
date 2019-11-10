import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_TICKET, URL_AUTH, URL_SELECCION, URL_MENSAJES } from '../comun/link';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  selecciones: any;
  selecciones2: any;
  cuota: any;
  esperando = false;
  ticketes = null;
  ticketes2 = null;
  aganar: any;
  montoapuesta = 10;

  wines = ''; montos: any; public apostado = 0;

  menuT: any = [
    {
      titulo: 'Noticias',
      data: 'Ir a Noticias',
      icono: 'far fa-newspaper',
      link: 'noticias'
    },
    {
      titulo: 'Bancos',
      data: 'Ir a Bancos',
      icono: 'fa fa-university',
      link: 'bancos'
    },
    {
      titulo: 'Promociones',
      data: 'Ir a Promociones',
      icono: 'fa fa-gift',
      link: 'promociones'
    },
    {
      titulo: 'Estadísticas',
      data: 'Ir a Estadísticas',
      icono: 'fas fa-percent',
      link: 'estadisticas'
    },
    {
      titulo: 'Resultados',
      icono: 'fas fa-flag-checkered',
      data: 'Ir a Resultados',
      link: 'verResultados'
    }
  ];

  menu: any;

  estatus = 'noSesion';
  usuario: Usuario = new Usuario(
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
    ''
  );

  token = '';

  constructor(
    private http: HttpClient,
  ) { }

  cargarMenuLocal() {
    this.menu = JSON.parse(localStorage.getItem('menu'));

    if ( this.menu === null ) {
      this.menu = this.menuT;
    }
  }

  salirMenu() {
    this.menu = this.menuT;
  }

  cambioApuesta ( montoapuesta ) {
    this.montoapuesta = montoapuesta;
    this.aganar = montoapuesta * this.cuota;
  }

  obtenerUsuario ( usuario, contrasena, tipoken ) {
    if ( usuario !== undefined) {
      return this.http.post(URL_AUTH + '/login', {
        "nick":usuario,
        "password":contrasena
      }).pipe(map( (resp: any) => {
        const res = resp;
        this.menu = res.menu;
        localStorage.setItem('menu', JSON.stringify(this.menu));
        return res;
      }));
    }
  }

  obtenerSelecciones () {
    this.esperando = true;
    const url = URL_SELECCION + '/obtener/' + this.usuario.id;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        localStorage.setItem('tiposeleccion', resp.tipo);
        localStorage.setItem('selecciones', JSON.stringify(resp.selecciones));
        if ( resp.tipo === '2x') {
          this.selecciones = [];
          this.selecciones2 = resp.selecciones;
          this.cuota = resp.cuota;
        } else if ( resp.tipo === '27') {
          this.selecciones2 = [];
          this.selecciones = resp.selecciones;
        } else if ( resp.tipo === '') {
          this.selecciones = [];
          this.selecciones2 = [];
        }
        this.esperando = false;
        this.cambioApuesta( this.montoapuesta );
        return resp;
      }));
  }

  seleccionh ( id_apuesta, usuario ) {
    this.esperando = true;
    this.ticketes = null;
    this.ticketes2 = null;
    const url = URL_SELECCION + '/agregarh/' + id_apuesta;

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        const res = resp;
        this.selecciones = resp.selecciones;

        this.esperando = false;

        return res;
      })
    );
  }

  selecciond ( id_apuesta, id_categoria, id_usuario ) {
    this.esperando = true;
    this.ticketes = null;
    this.ticketes2 = null;
    const url = URL_SELECCION + '/agregard/' + id_apuesta;

    return this.http.post( url, {id_usuario, id_categoria} )
      .pipe(map( (resp: any) => {
        const res = resp;
        if ( resp.selecciones ) {
            this.selecciones2 = resp.selecciones;

            this.cuota = resp.cuota;

            this.cambioApuesta( this.montoapuesta );
        }
        this.esperando = false;
        return res;
      })
    );
  }

  query() {
    const x: any = document.getElementsByClassName('amt');

    const y: any = document.getElementsByClassName('select_horse_win');
    let suma: any = 0;
    let valors = '';
    let wins = '';

    for (let i = 0; i < x.length; i++) {
      if (!isNaN(x[i].value) && x[i].value !== '') {
        suma = parseFloat(suma) + x[i].value;
        valors = valors + '#' + x[i].value;
      } else {
        valors = valors + '#';
      }

      if (!isNaN(y[i].value) && y[i].value !== '') {
        wins = wins + '#' + y[i].value;
      } else {
        wins = wins + '#';
      }
    }
    this.wines = wins;
    this.montos = valors;
    this.apostado = suma;
  }

  recogerSesion() {
    const idr = localStorage.getItem('id');
    const tokenr = localStorage.getItem('token');
    const usuarior = JSON.parse(localStorage.getItem('usuario'));

    if ( usuarior !== null && tokenr !== null && idr !== null) {
      this.usuario = usuarior;
      this.usuario.id = idr;
      this.estatus = 'Sesion';
    }
  }

  guardarUsuario( id: string, token: string, usuario: string ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.token = token;
  }

  enviarTicket( montos: string ) {
    this.esperando = true;
    const url = URL_TICKET + '/agregar';
    const id_usuario = this.usuario.id;

    return this.http.post( url, { montos, id_usuario }  )
      .pipe(map( (resp: any) => {
        this.esperando = false;
        const res = resp;
        if ( resp.status === 'success') {
          this.ticketes = resp.ticketes;
          this.usuario.player.available = resp.disponible;
          this.selecciones = null;
          this.esperando = false;
        }
        return res;
      })
    );
  }

  enviarTicketd( montos: number ) {
    this.esperando = true;
    const url = URL_TICKET + '/agregard';
    const id_usuario = this.usuario.id;

    return this.http.post( url, { montos, id_usuario }  )
      .pipe(map( (resp: any) => {
        this.esperando = false;
        const res = resp;
        if ( resp.status === 'success') {
          this.ticketes2 = resp.ticketes;
          this.usuario.player.available = resp.disponible;
          this.selecciones2 = null;
          this.esperando = false;
        }
        return res;
      })
    );
  }

  cargarTickets( estatus ) {
    const url = URL_TICKET + '/ver/' + this.usuario.id + '/' + estatus;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.ticketes;
      }));
  }

  borrarSel( id_sel ) {
    this.esperando = true;
    const url = URL_SELECCION + '/' + id_sel;

    return this.http.delete( url )
      .pipe(map ( (resp: any) => {
        this.obtenerSelecciones();
        return resp;
      }));
  }

  cargarMensajes ( pagina, criterio, id_usuario ) {
    const url = URL_MENSAJES + '/mensajes/' + criterio + '/' + id_usuario + '/' + pagina;

    return this.http.get( url )
    .pipe(map ( (resp: any) => {
      return resp;
    }));
  }
}

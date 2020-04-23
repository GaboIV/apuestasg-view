import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_TICKET, URL_AUTH, URL_SELECCION, URL_MENSAJES, URL_JUGADORES } from '../comun/link';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  selecciones: any;
  selecciones2: any;
  cuota: any;
  esperando = false;
  ticketes = null;
  ticketes2 = null;
  aganar: any;
  montoapuesta = 10;
  countries = JSON.parse(localStorage.getItem('countries'));
  categories = JSON.parse(localStorage.getItem('categories'));

  esperandologion = false;

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
    null
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
    this.montoapuesta = montoapuesta.toString().replace(/,/g, '.');
    this.aganar = montoapuesta * this.cuota;
  }

  obtenerUsuario ( usuario, contrasena, tipoken = '' ) {
    this.ticketes = null;
    this.ticketes2 = null;
    if ( usuario !== undefined && usuario != '' ) {
      let url = '';

      if (contrasena == '') {
        const tokenr = localStorage.getItem('token'); 

        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + tokenr
          })
        };

        url = URL_JUGADORES + '/login';

        contrasena = 'XyX_cuirrten_WeR_2364';
        usuario = 'XyX_cuirrply_WeR_2364';
      } else {
        url = URL_AUTH + 'login';
      }

      return this.http.post(url, {
        "nick" : usuario,
        "password" : contrasena,
        "tipoken" : tipoken
      }, this.httpOptions).pipe(map( (resp: any) => {
        const res = resp;
        this.menu = res.menu;
        this.usuario = res.user;
        localStorage.setItem('menu', JSON.stringify(this.menu));
        return res;
      }));
    }
  }

  obtenerSelecciones () {
    this.ticketes = null;
    this.ticketes2 = null;

    this.esperando = true;
    const url = URL_SELECCION + '/load';

    const tokenr = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + tokenr
      })
    };

    return this.http.get( url, this.httpOptions )
      .pipe(map ( (resp: any) => {
        localStorage.setItem('tiposeleccion', resp.tipo);
        localStorage.setItem('selecciones', JSON.stringify(resp.selecciones));
        if ( resp.tipo === '2x') {
          this.selecciones = [];
          this.selecciones2 = resp.selecciones;
          this.cuota = resp.quot;
        } else if ( resp.tipo === '7') {
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
    const url = URL_SELECCION + '/addhipism';

    return this.http.post( url, {
      "bet_id" : id_apuesta
    }, this.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        this.selecciones = resp.selections;

        this.esperando = false;

        return res;
      })
    );
  }

  selecciond ( id_apuesta, id_categoria, id_usuario ) {
    this.esperando = true;
    this.ticketes = null;
    this.ticketes2 = null;
    const url = URL_SELECCION + '/add';

    return this.http.post( url, {
      "bet_id" : id_apuesta,
      "category_id" : id_categoria
    }, this.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        if ( resp.selections ) {
            this.selecciones2 = resp.selections;
            this.cuota = resp.quot;

            this.cambioApuesta( this.montoapuesta );
        }
        this.esperando = false;

        return resp;
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

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + tokenr
      })
    };

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

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    this.token = token;
  }

  enviarTicket( montos: string ) {
    this.esperando = true;
    const url = URL_TICKET + '/addhipism';
    const id_usuario = this.usuario.id;

    return this.http.post( url, { montos, id_usuario }, this.httpOptions )
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
    const url = URL_TICKET + '/add';
    const id_usuario = this.usuario.id;

    if (isNaN(this.aganar) == true) {
      const toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      toast({
        type: 'warning',
        title: 'Debes ingresar un aporte válido'
      });
      this.esperando = false;
      return;
    }

    return this.http.post( url, { montos, id_usuario }, this.httpOptions )
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
    const url = URL_TICKET + '/load';

    return this.http.get( url, this.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  borrarSel( id_sel ) {
    this.esperando = true;
    const url = URL_SELECCION + '/delete/' + id_sel;

    return this.http.delete( url, this.httpOptions )
      .pipe(map ( (resp: any) => {
        this.obtenerSelecciones();
        return resp;
      }));
  }

  borrarAll() {
    this.esperando = true;
    const url = URL_SELECCION + '/delete/all';

    return this.http.delete( url, this.httpOptions )
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

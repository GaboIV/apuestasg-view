import { Component, OnInit, Input } from '@angular/core';
import { Partido } from '../../modelos/partido';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { PartidosService } from '../../servicios/partidos.service';
import { CaballosService } from '../../servicios/caballos.service';
import { Carrera } from '../../modelos/carrera';
import { GeneralesService } from '../../servicios/generales.service';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';
import { Usuario } from '../../modelos/usuario';
import * as $ from 'jquery';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import swal from 'sweetalert2';

@Component({
  selector: 'app-importantes',
  templateUrl: './importantes.component.html',
  styleUrls: ['./importantes.component.css']
})
export class ImportantesComponent implements OnInit {

  @Input()
  urlSafe: SafeResourceUrl;

  public largoVentana: any;
  public largoTabla: any;
  public anchoVentana: any;
  public anchoTabla: any;
  public apostado = 0;

  public scrollbarOptions = { axis: 'x', theme: 'light',  alwaysShowScrollbar: 1 };
  public scrollbarOptions2 = { theme: 'dark-2',  alwaysShowScrollbar: 1, scrollbarPosition: 'inside' };

  partidos: Partido;
  estatus: string;
  envivos: Partido;
  dias_carr = [];
  // tslint:disable-next-line:max-line-length
  envivo = '//sportstream365.com/viewer/frame/?game=1909202&tagz=LZJJzqNGAEaVHCJrVr@6pQQDBYWdlhUG_x7BNmawsRKhwhSYeSoGe5kr5BCRIuUCuUir@yC9TbzI5pOent7u@@NvdsrSUKB5nmYh@Pzvb8YP0q_f_fPt9z9POMQNbr5@790JqX6eTNqqbEhLGoxy8CpuZT7pYzzgZhI2KMeTX6LXztkZIwBh9kZQ9Jxr14XiE32QN_5y5cmquRCcfDAPyYkBrlu7HBQI2u4e2o2LjLp@sDY33RaXGq@sbeoE8lHWzfcswApmg1SV11rjMTDYA8n3pFGGq@cG2Ub73IjitO_LoigEcQYbYdqPG7F0HUmqdN@eOb2267psgVjG3BDT8W51oEHt3U6IdrGQmbeEzb11gU6WGV3zhdX0a83VbimDN1JsB7GQsvbN75@XB@g4wzy0Wn1osiQKy8EJFJXUjPq@dYewUsDa2FrC8dHbj2MrHhKu5Z6xePaXwBWBGyYZw10tca1zBT_ta85a7AJptQ9BSCAbGN2JS@quX0qH9YzxTISmWwQel8FUlMBhNW0vGAkZhVEEsXyBzrVcDMBU4KHe5MzsuEpStjNwCWOgt93@NALGZW3Nc6uCz1Uc7CJ4PpnV1dbfrVxMXdShVWqMrqKG0ZW_Ho3DMdny6iU7LztlBVQubfNhuLtYSXXXW_CqXQpLKOd@4tesPjybSx2ObRyr6hgb@njqZAiQg7zWk2RjPn@7YxTgZs68oY6UVYYec_ZtiANynwuQedk4upM5JzB_2S1ufpIjXJAvjV4@4yxDE4FmqA_nuAjKoaX2FgVp9hP1Ysh_okbIf6TkqsrwGfu7mEwEINIAUh92a0vXfqSyOMXUCt_S8iOl3pvy9U2RoRkaCGBKsyxDmShETfx_9h8=&header=1&autoplay=1&width=348&height=200';
  destacados: Partido;
  carreras: Carrera;
  id: string;
  liga_temp = 0;
  juegos: any;
  usuario: any;

  mstatus = null;

  dia_c = '';
  carrera_c = '';

  esperando = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public _partidosService: PartidosService,
    public _generalesService: GeneralesService,
    public _caballoService: CaballosService,
    public _inicioSesion: InicioSesionService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.dia_c = params.dia;
      this.carrera_c = params.carrera;
    });

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.envivo);
    this.route.params
        .subscribe( parametros => {
          this.id = parametros['id_categoria'];
          $('.ep_cada_cat').removeClass('seleccionadosport');
              $('#temp-' + this.id).addClass(' seleccionadosport ');
              $('.spin_cat').removeClass('iconosport');
              $('#spin-' + this.id).addClass(' iconosport ');
          if ( parametros['id_categoria'] === '27') {
            this.esperando = true;
            this._caballoService.cargarCarreras('todas')
            .subscribe( resp => {
              this.esperando = false;
              this.carreras = resp.carreras;
              this.dias_carr = resp.dias;
              this.partidos = null;

              if (this.dia_c === undefined || this.carrera_c === undefined) {
                // tslint:disable-next-line:max-line-length
                this.router.navigate(['/importantes/27'], { queryParams: { 'dia': this.dias_carr[0].dia, 'carrera': this.carreras[0].numero } });
              }
            });
          } else {
            this.esperando = true;
            this._partidosService.partidosPorCategoria(this.id, 'normal', '')
            .subscribe( (resp: any) => {
              console.log( resp.partidos );
              this.esperando = false;
              this.partidos = resp.partidos;
              this.estatus = resp.status;
              this.carreras = null;
            });
          }
        });
    $('.mensaje_cp').hide();
    this.cargarDestacados();
    this.cargarCategoriasJuegos();

    this.usuario = this._inicioSesion.usuario;

    $('.ep_cada_cat').removeClass('seleccionadosport');
    $('#temp-' + this.id).addClass(' seleccionadosport ');
    $('.spin_cat').removeClass('iconosport');
    $('#spin-' + this.id).addClass(' iconosport ');

    this.scroll_cuot();

    this.query2();

    this.cargarEnVivo();
  }

  query2 () {
    $('#iframejogo').click( () => {
      alert('Hola');
    } );
  }

  deleteFile () {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    toast ({
      type: 'success',
      title: 'Guardado'
    });
  }

  scroll_cuot () {
    $(() => {

      $(window).scroll(function() {
        const ancho = $('.zona_cuota').width();

        if ($(this).scrollTop() > 137) {
            $('.zona_cuota').addClass('fixed');
            $('.zona_cuota').removeClass('unfixed');
            $('.zona_cuota').width( ancho );
        } else {
            $('.zona_cuota').removeClass('fixed');
            $('.zona_cuota').addClass('unfixed');
        }
      });
    });
  }

  check( id_liga ) {
    if ( this.liga_temp === id_liga ) {
      return false;
    } else {
      this.liga_temp = id_liga;
      return true;
    }
  }

  clase ( valor, deporte, equipo ) {
    if (valor === 3) {
      if ( equipo === '35') {
        return 'ep_cada_logo ep_cada_central ep_empate_div';
      }
      return 'ep_cada_logo ep_cada_central';
    }
    if ( valor === 2) {
      if ( deporte === 24) {
        return 'ep_cada_logo ep_cada_pero_dos css_jugador';
      } else {
        return 'ep_cada_logo ep_cada_pero_dos css_jugador';
      }
    }
  }

  queclase ( equipos, categoria, id_equipo ) {
    let clase = 'gen_imp_eq';
    const equipos_cant = equipos.length;

    if (equipos_cant === 2) {
      clase += ' eq_dos';

      if ( categoria === '29' || categoria === '24') {
        clase += ' dato_eq';
      }

      if ( equipos[0].pitcher !== false || equipos[0].pitcher !== false) {
        clase += ' dato_eq';
      }
    }

    if ( equipos_cant === 3) {
      if ( equipos[1].nombre === 'Empate') {
        if ( id_equipo === '35') {
          clase += ' eq_tres_emp';
        } else {
          clase += ' eq_tres';
        }
      }
    }

    return clase;

  }

  cargarDestacados() {
    this._partidosService.cargarDestacados()
          .subscribe( destacados => this.destacados = destacados );
  }

  cargarCategoriasJuegos() {
    this._generalesService.cargarCategoriasJuegos()
          .subscribe( juegos => this.juegos = juegos );
  }

  seleccionh( id_apuesta ) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast ({
      type: 'info',
      title: 'Enviando datos'
    });

    this._inicioSesion.seleccionh( id_apuesta, this._inicioSesion.usuario )
      .subscribe( resp => {
          // tslint:disable-next-line:no-shadowed-variable
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          toast ({
            type: resp.status,
            title: resp.mstatus
          });

          this.mstatus = resp.mstatus;
      });
    }

  selecciond ( id_apuesta, id_categoria ) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast ({
      type: 'info',
      title: 'Enviando datos'
    });

    this._inicioSesion.selecciond( id_apuesta, id_categoria, this._inicioSesion.usuario.id_usuario )
      .subscribe( resp => {
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          toast ({
            type: resp.status,
            title: resp.mstatus
          });
    });
  }

  solohoy() {
    if ( this.id === '27') {
      this.esperando = true;
      this._caballoService.cargarCarreras('hoy')
      .subscribe( resp => {
        this.esperando = false;
        this.carreras = resp.carreras;
        this.partidos = null;
      });
    } else {
      this.esperando = true;
      this._partidosService.partidosPorCategoria(this.id, 'hoy', '')
      .subscribe( (partidos: Partido) => {
        this.esperando = false;
        this.partidos = partidos;
        this.carreras = null;
      });
    }
  }

  buscarEquipo ( forma ) {
    this.esperando = true;
    this._partidosService.partidosPorCategoria(this.id, 'normal', forma.busqueda)
            .subscribe( (partidos: Partido) => {
              this.esperando = false;
              this.partidos = partidos;
              this.carreras = null;
            });
  }

  cargarEnVivo () {
    this._partidosService.cargarEnVivo()
    .subscribe( resp => {
      if (resp.status === 'correcto') {
        this.envivo = resp.partidos[0].live_id;
        this.regenerar( this.envivo );
        this.envivos =  resp.partidos;
      }
    });
  }

  regenerar( live_id ) {
    // tslint:disable-next-line:max-line-length
    this.envivo = '//sportstream365.com/viewer/frame/?game=' + live_id + '&tagz=LZJJzqNGAEaVHCJrVr@6pQQDBYWdlhUG_x7BNmawsRKhwhSYeSoGe5kr5BCRIuUCuUir@yC9TbzI5pOent7u@@NvdsrSUKB5nmYh@Pzvb8YP0q_f_fPt9z9POMQNbr5@790JqX6eTNqqbEhLGoxy8CpuZT7pYzzgZhI2KMeTX6LXztkZIwBh9kZQ9Jxr14XiE32QN_5y5cmquRCcfDAPyYkBrlu7HBQI2u4e2o2LjLp@sDY33RaXGq@sbeoE8lHWzfcswApmg1SV11rjMTDYA8n3pFGGq@cG2Ub73IjitO_LoigEcQYbYdqPG7F0HUmqdN@eOb2267psgVjG3BDT8W51oEHt3U6IdrGQmbeEzb11gU6WGV3zhdX0a83VbimDN1JsB7GQsvbN75@XB@g4wzy0Wn1osiQKy8EJFJXUjPq@dYewUsDa2FrC8dHbj2MrHhKu5Z6xePaXwBWBGyYZw10tca1zBT_ta85a7AJptQ9BSCAbGN2JS@quX0qH9YzxTISmWwQel8FUlMBhNW0vGAkZhVEEsXyBzrVcDMBU4KHe5MzsuEpStjNwCWOgt93@NALGZW3Nc6uCz1Uc7CJ4PpnV1dbfrVxMXdShVWqMrqKG0ZW_Ho3DMdny6iU7LztlBVQubfNhuLtYSXXXW_CqXQpLKOd@4tesPjybSx2ObRyr6hgb@njqZAiQg7zWk2RjPn@7YxTgZs68oY6UVYYec_ZtiANynwuQedk4upM5JzB_2S1ufpIjXJAvjV4@4yxDE4FmqA_nuAjKoaX2FgVp9hP1Ysh_okbIf6TkqsrwGfu7mEwEINIAUh92a0vXfqSyOMXUCt_S8iOl3pvy9U2RoRkaCGBKsyxDmShETfx_9h8=&header=1&autoplay=1&width=348&height=200';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.envivo);

  }

}

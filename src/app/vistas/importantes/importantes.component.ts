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
import { environment } from 'src/environments/environment';
import Echo from 'laravel-echo';

declare global {
  interface Window {
    Echo: any;
  }
}

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

  game_selected: any = null;

  colors = ['FE0000', '0000FE', '006837', '28ABE3', '4caf50', '93268F', '000000', '808080', 'F15A25', '8C6238', 'FBB03B', '00FF01', '8CC63E', 'C1282D', '23B574', '00FFFF', '2E3192', 'ED1E79', '4D4D4D', 'F15A25', 'FE0000', '0000FE', 'FBB03B', '2E3192', 'FE0000', '0000FE', 'FDEE21', '23B574', 'FE0000', '0000FE', 'FE0000', 'F15A25', 'FE0000', '0000FE', '0000FE', '8C6238', 'FE0000', '0000FE', '006837', 'FE0000'];

  public scrollbarOptions = { axis: 'x', theme: 'light', alwaysShowScrollbar: 1 };
  public scrollbarOptions2 = { theme: 'dark-2', alwaysShowScrollbar: 1, scrollbarPosition: 'inside' };

  partidos: Partido;
  estatus: string;
  dias_carr = [];
  destacados: Partido;
  carreras: Carrera;
  id: any;
  liga_temp = 0;
  juegos: any = [];
  usuario: any;

  racecourses: any;

  racecourse: number;

  mstatus = null;

  radio = "24";

  dia_c = '';
  carrera_c = '';
  hip_c = '';

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
    this.cargarCategoriasJuegos();  
    this.esperando = true;

    this.route.queryParams
    .subscribe(params => {
      if (this.dia_c != params.dia) {
        this.dia_c = params.dia;
        this.carrera_c = '1';
      } else {
        this.dia_c = params.dia;
        this.carrera_c = params.carrera;
      }    

      // if (params.pantalla == 'principal') {
      //   this.solohoy(1);
      // }
    });

    this.route.params
    .subscribe(parametros => {
      this.id = parametros['id_categoria']; 
              
      $('.ep_cada_cat').removeClass('seleccionadosport');
      $('#temp-' + this.id).addClass(' seleccionadosport ');
    });
    $('.mensaje_cp').hide();
    this.cargarDestacados();

    this.usuario = this._inicioSesion.usuario;

    $('.ep_cada_cat').removeClass('seleccionadosport');
    $('#temp-' + this.id).addClass(' seleccionadosport ');
    $('.spin_cat').removeClass('iconosport');
    $('#spin-' + this.id).addClass(' iconosport ');

    this.scroll_cuot();

    let config_broadcaster = environment.optionsWebsocketsEcho;
    config_broadcaster['auth'] = {
      headers:
      {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    };

    window.Echo = new Echo(config_broadcaster);

    window.Echo.private('notifications')
      .listen('UserSessionChanged', data => {
        console.log(data);
      });
  }

  deleteFile() {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    toast({
      type: 'success',
      title: 'Guardado'
    });
  }

  scroll_cuot() {
    // $(() => {
    //   $(window).scroll(function () {
    //     const ancho = $('.zona_cuota').width();
    //     const alto = $('.central_bet').height();

    //     if ($(this).scrollTop() > 137) {
    //       $('.zona_cuota').addClass('fixed');
    //       $('.zona_cuota').removeClass('unfixed');
    //       $('.zona_cuota').width(ancho);
    //     } else {
    //       $('.zona_cuota').removeClass('fixed');
    //       $('.zona_cuota').addClass('unfixed');
    //     }

    //     const win_wid = $(window).height();
    //     const z1_wid = $('#z1_bet').height();
    //     const ancho1 = $('#z1_bet').width();

    //     // console.log($(this).scrollTop(), ($(window).height() - 137));


    //     if (($(this).scrollTop() >= 137) && (win_wid > z1_wid)) {
    //       $('#z1_bet').addClass('fixed');
    //       $('#z1_bet').width(ancho1);
    //     // } else if ($(this).scrollTop() > ($(window).height() - 137)) {
    //     //   $('#z1_bet').addClass('fixedbottom');
    //     //   $('#z1_bet').width(ancho1);
    //     // } 
    //     } else {
    //       $('#z1_bet').removeClass('fixed');
    //       $('#z1_bet').removeClass('fixedbottom');
    //     }


    //     const z2_wid = $('#z2_bet').height();
    //     const ancho2 = $('#z2_bet').width();

    //     if (win_wid > z2_wid) {
    //       if ($(this).scrollTop() > 137) {
    //         $('#z2_bet').addClass('fixed');
    //         $('#z2_bet').width(ancho2);
    //       } else {
    //         $('#z2_bet').removeClass('fixed');
    //       }
    //     }

    //     // $('.central_bet').height(alto);
    //   });
    // });
  }

  check(id_liga) {
    if (this.liga_temp === id_liga) {
      return false;
    } else {
      this.liga_temp = id_liga;
      return true;
    }
  }

  clase(valor, deporte, equipo) {
    if (valor === 3) {
      if (equipo === '1') {
        return 'ep_cada_logo ep_cada_central ep_empate_div';
      }
      return 'ep_cada_logo ep_cada_central';
    }
    if (valor === 2) {
      if (deporte === 4) {
        return 'ep_cada_logo ep_cada_pero_dos css_jugador';
      } else {
        return 'ep_cada_logo ep_cada_pero_dos css_jugador';
      }
    }
  }

  queclase(equipos, categoria, id_equipo) {
    let clase = 'gen_imp_eq';
    const equipos_cant = equipos.length;
    if (equipos_cant === 2) {
      clase += ' eq_dos';

      if (categoria === '9' || categoria === '4') {
        clase += ' dato_eq';
      }

      if (equipos[0].pitcher !== false || equipos[0].pitcher !== false) {
        clase += ' dato_eq';
      }
    }

    if (equipos_cant === 3) {
      if (equipos[1].name === 'Empate') {
        if (id_equipo === '1') {
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
      .subscribe(destacados => {
        this.destacados = destacados
      });
  }

  cargarCategoriasJuegos() {
    if (this.juegos.length == 0) {
      this._generalesService.cargarCategoriasJuegos()
      .subscribe(resp => {
        this.juegos = resp.categories;
        this.solohoy(this.id);
      });
    } else {
      this.solohoy(this.id);
    }
    
  }

  seleccionh(id_apuesta) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast({
      type: 'info',
      title: 'Enviando datos'
    });

    this._inicioSesion.seleccionh(id_apuesta, this._inicioSesion.usuario)
      .subscribe(resp => {
        // tslint:disable-next-line:no-shadowed-variable
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
        toast({
          type: resp.status,
          title: resp.mstatus
        });

        this.mstatus = resp.mstatus;
      });
  }

  selecciond(id_apuesta, id_item, id_categoria) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast({
      type: 'info',
      title: 'Enviando datos'
    });

    this._inicioSesion.selecciond(id_apuesta, id_item, id_categoria, this._inicioSesion.usuario.id)
      .subscribe(resp => {
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
        toast({
          type: resp.status,
          title: resp.mstatus
        });
      });
  }

  solohoy(id, radio = this.radio) {
    this.id = id;
    if (this.id == 7) {
      this.esperando = true;
      this._caballoService.indexRacecoruseActive()
        .subscribe(resp => {
          // this.carreras = resp.carreras;
          // this.dias_carr = resp.dias;
          // this.partidos = null;

          // if (this.dia_c == undefined || this.carrera_c == undefined) {
          //   // tslint:disable-next-line:max-line-length
          //   this.router.navigate(['/importantes/7'], { queryParams: { 'dia': this.dias_carr[0].dia, 'hipodromo': this.dias_carr['hip'], 'carrera': this.carreras[0].number } });
          // }
          this.racecourses = resp.data;    
          
          if (this.racecourses.length > 0) {
            this.getCareers(this.racecourses[0].id);
          } else {
            this.esperando = false;
          }
        });
    } else {
      this.esperando = true;
      this._partidosService.partidosPorCategoria(this.id, radio, '')
        .subscribe(resp => {
          this.esperando = false;
          this.partidos = resp.juegos;
          this.carreras = null;
          this.racecourses = null;
          this.router.navigate(['/importantes/' + this.id]);
        });
    }
  }

  getCareers(racecourse: any) {
    this.esperando = true;
    this._caballoService.cargarCarreras(racecourse)
      .subscribe(resp => {
        this.esperando = false;

        this.racecourse = racecourse;

        // console.log(this.racecourse);

        this.router.navigate(['/importantes/7'], { queryParams: { 'dia': resp.dias[0].dia, 'hipodromo': resp.dias[0]['hip'], 'carrera': resp.carreras[0].number } });

        this.dias_carr = resp.dias;
        this.partidos = null;  

        this.dia_c = resp.dias[0].dia;

        // console.log(this.dia_c, this.racecourse);
        this.carrera_c = resp.carreras[0].number;

        this.carreras = resp.carreras;
        // tslint:disable-next-line:max-line-length    
            
        
      });
  }

  buscarEquipo(forma) {
    this.esperando = true;
    this._partidosService.partidosPorBusqueda(this.id, 'normal', forma.busqueda)
      .subscribe((resp) => {
        this.esperando = false;
        this.partidos = resp.juegos.data;
        this.carreras = null;
      });
  }

  verifyRadio(value = this.radio, id = this.id) {
    if (this.radio != value) {
      this.radio = value;
      this.solohoy(this.id, value);
    }
  }
}

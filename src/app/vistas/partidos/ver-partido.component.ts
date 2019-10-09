import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Partido } from '../../modelos/partido';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';

@Component({
  selector: 'app-ver-partido',
  templateUrl: './ver-partido.component.html',
  styleUrls: ['./ver-partido.component.css']
})
export class VerPartidoComponent implements OnInit {

  partido: Partido[] = [];
  param = '';
  regreso: any;
  esperando = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _partidosService: PartidosService,
    public _inicioSesion: InicioSesionService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
      const param = parametros.id_partido;

      this.param = param;

      this._partidosService.cargarPartidos(1, '!' + param)
      .subscribe( partidos => {
        this.partido = partidos;
      });
    });

    this.scroll_cuot();
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

  queclase ( equipos, categoria, id_equipo ) {
    let clase = 'gen_imp_eq';
    const equipos_cant = equipos.length;

    if (equipos_cant === 2) {
      clase += ' eq_dos';

      if ( categoria === '29' || categoria === '24') {
        clase += ' dato_eq';
      }

      console.log(  );

      if ( (equipos[0].pitcher !== undefined) && (equipos[0].pitcher !== false || equipos[1].pitcher !== false) ) {
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

  selecciond ( id_apuesta, id_categoria ) {

    this.esperando = true;

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

          this.esperando = false;
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
    });
  }


}

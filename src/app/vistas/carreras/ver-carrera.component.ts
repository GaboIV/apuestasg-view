import { Component, OnInit } from '@angular/core';
import { CaballosService } from 'src/app/servicios/caballos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera } from 'src/app/modelos/carrera';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';
import swal from 'sweetalert2';
import { PartidosService } from 'src/app/servicios/partidos.service';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-ver-carrera',
  templateUrl: './ver-carrera.component.html',
  styleUrls: ['./ver-carrera.component.css', './carrera.component.css']
})
export class VerCarreraComponent implements OnInit {

  carrera: Carrera[] = [];

  mstatus = null;
  wines = '';

  param = '';

  regreso: any;

  esperando = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _caballoService: CaballosService,
    public _inicioSesion: InicioSesionService,
    public _generalesService: GeneralesService,
    public _partidosService: PartidosService
  ) {
    setInterval(() => { this.conteo( this.carrera[0].fecha_hora ); }, 1000);
  }

  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
      const param = parametros.id_carrera;

      this.param = param;

      this.carrera = this._caballoService.seleccionCarrera(param);

      this._caballoService.cargarCarreras('todas')
      .subscribe( resp => {

      });

      this._caballoService.cargarUnaCarreras(param)
      .subscribe( resp => {
        this.carrera = resp.carreras;
      });
    });

    this.scroll_cuot();
  }

  seleccionh( id_apuesta ) {
    this.esperando = true;

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

          this.mstatus = resp.mstatus;
      });
    }

  conteo( fecha ) {
    const fecha_hora = new Date(fecha);
    const hoy = new Date(this._generalesService.fecha);

    let dias = 0;
    let horas: any = 0;
    let minutos: any = 0;
    let segundos: any = 0;

    if (fecha_hora > hoy) {
      let diferencia = ( fecha_hora.getTime() - hoy.getTime() ) / 1000;
      dias = Math.floor( diferencia / 86400 );
      diferencia = diferencia - ( 86400 * dias );
      horas = Math.floor( diferencia / 3600 );
      diferencia = diferencia - ( 3600 * horas );
      minutos = Math.floor( diferencia / 60 );
      diferencia = diferencia - ( 60 * minutos );
      segundos = Math.floor( diferencia );

      if ( horas < 10 ) {
        horas = '0' + horas;
      }

      if (minutos < 10) {
        minutos = '0' + minutos;
      }

      if (segundos < 10) {
        segundos = '0' + segundos;
      }


      if (dias === 0) {
        if ( horas < 1 ) {
          if ( minutos > 1) {
            this.regreso = minutos + 'm ' + segundos + 's';
          } else {
            this.regreso = segundos + 's';
          }
        } else {
          this.regreso =  horas + 'h ' + minutos + 'm ' + segundos + 's';
        }
      }

      if (dias > 0) {
        this.regreso = dias + 'D ' + horas + ':' + minutos + ':' + segundos;
      }
  } else {
    this.regreso = dias + ' D&iacute;as, ' + horas + ' Horas, ' + minutos + ' Minutos, ' + segundos + ' Segundos';
    }
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
}

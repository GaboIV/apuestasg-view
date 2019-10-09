import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PartidosService } from '../../servicios/partidos.service';
import { Partido } from '../../modelos/partido';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {

  partido: any;

  pitchers: Array<{nombre: string, era: string}>;
  era1 = '';
  era2 = '';
  id_part1 = '';
  id_part2 = '';
  id_equipo1 = '';
  id_equipo2 = '';
  enviando = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _partidosService: PartidosService,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe( parametros => {
        const param = '!' + parametros.id_partido;
        this._partidosService.cargarPartidos(1, param)
          .subscribe( partidos => {
            this.partido = partidos;
            this.id_part1 = partidos[0].equipos[0].id_participante;
            this.id_part2 = partidos[0].equipos[1].id_participante;
            this.id_equipo1 = partidos[0].equipos[0].id_equipo;
            this.id_equipo2 = partidos[0].equipos[1].id_equipo;
            if ( partidos[0].equipos[0].pitchers !== 'undefined') {
              $(() => {
                $( '#p1' ).autocomplete({
                    source: partidos[0].equipos[0].pitchers
                });
              });
            }

            if ( partidos[0].equipos[1].pitchers !== 'undefined') {
              $(() => {
                $( '#p2' ).autocomplete({
                    source: partidos[0].equipos[1].pitchers
                });
              });
            }
          });
      });
  }

  guardarInfo() {

    this.pitchers = [
      { nombre: $('#p0').val() , era: $('#e0').val() },
      { nombre: $('#p1').val() , era: $('#e1').val() },
    ];

    this._partidosService.guardarDatos(this.pitchers, this.partido)
    .subscribe( resp => {
      if ( resp.status === 'success') {
        swal(
          '¡Partido modificado!',
          'Los datos se han modificado correctamente',
          'success'
        );
      }
    });
  }

  cuotaDecimal (valor) {
    const datos = valor.split('/');
    let res;

    if ( datos[1] ) {
      res = (datos[0] / datos[1]) + 1 ;
    } else {
      res = (datos[0] * 1) + 1;
    }

    const res2 = res.toFixed(2);

    return res2;
  }

  gcd ( a, b ) {
    if (b < 0.0000001) { return a; }
    return this.gcd(b, Math.floor(a % b));
  }

  cuotaFraq (id_eq, aalor, i) {
    const valor = (aalor - 1).toFixed(3);
    const len = valor.toString().length - 2;

    let denominator = Math.pow(10, len);
    let numerator = parseFloat(valor) * denominator;

    const divisor = this.gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    const fraq = Math.floor(numerator) + '/' + Math.floor(denominator);

    this.partido[0].equipos[i].dividendo = fraq;

    $(() => {
      $('#fq-' + id_eq).val(fraq);
    });
  }
}

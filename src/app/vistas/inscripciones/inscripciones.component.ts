import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../modelos/carrera';
import { Hipodromo } from '../../modelos/hipodromo';
import { Caballo } from '../../modelos/caballos';
import { Jinete } from '../../modelos/jinetes';
import { Entrenador } from '../../modelos/entrenadores';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';

declare var $: any;

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  carreras: Carrera[] = [];
  hipodromos: Hipodromo[] = [];
  caballos: Caballo[] = [];
  jinetes: Jinete[] = [];
  entrenadores: Entrenador[] = [];
  caballosui: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService
  ) { }

  ngOnInit() {
    this.carreras = JSON.parse( localStorage.getItem('carreras') );
    this.cargarCarreras();

    this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
    this.cargarHipodromos();
    this.cargarCaballosUI();
  }

  cargarCarreras() {
    this._caballoService.cargarCarreras('todas')
          .subscribe( resp => {
            this.carreras = resp.carreras;
            localStorage.setItem('carreras', JSON.stringify(resp.carreras) );
          } );
  }

  cargarHipodromos() {
    this._caballoService.cargarHipodromos()
          .subscribe( hipodromos => {
            this.hipodromos = hipodromos;
            localStorage.setItem('hipodromos', JSON.stringify(hipodromos) );
          } );
  }

  cargarCaballosUI() {
    this._caballoService.cargarCaballosUI()
          .subscribe( caballosui => {
            this.caballosui = caballosui;
            localStorage.setItem('caballosui', JSON.stringify(caballosui) );

            $(() => {
              $( '#autocc' ).val('Hola');
              $( '#autocc' ).autocomplete({
                  source: caballosui
              });
            });
          });
  }

  abrirCarrera ( id ) {
    $(() => {
      $( '#' + id + '_id' ).toggle();

      if ($('#carr_' + id).hasClass('lc_lineal') === true ) {
        $('#carr_' + id).removeClass('lc_lineal');
        $('#tt_' + id).removeClass('lineal_tt');
        $('#mas_' + id).removeClass('siver');
      } else {
        $('#carr_' + id).addClass(' lc_lineal ');
        $('#tt_' + id).addClass('lineal_tt');
        $('#mas_' + id).addClass('siver');
      }
    });
  }



}

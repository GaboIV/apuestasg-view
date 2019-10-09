import { Component, OnInit } from '@angular/core';
import { DeportesService } from '../../servicios/deportes.service';
import { Deporte } from '../../modelos/deporte';
import { PartidosService } from '../../servicios/partidos.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  deportes: Deporte[];
  ligas: any = [];
  partidos: any = [];
  carreras: any = [];

  constructor(
    public _deporteService: DeportesService,
    public _partidosService: PartidosService
  ) { }

  ngOnInit() {
    this.cargarDeportes();
  }

  cargarDeportes() {
    this._deporteService.cargarDeportes()
          .subscribe( deportes => this.deportes = deportes );
  }

  seleccionDeporte ( seleccion ) {
    this.ligas = null;
    this._partidosService.seleccionDeporte( seleccion )
      .subscribe( ligas => this.ligas = ligas );
  }

  seleccionLiga( seleccion ) {
    this.partidos = null;
    this.carreras = null;
    this._partidosService.seleccionLiga( seleccion )
      .subscribe( partidos => this.partidos = partidos );
  }

  seleccionHipodromo( seleccion ) {
    this.partidos = null;
    this.carreras = null;
    this._partidosService.seleccionHipodromo( seleccion )
      .subscribe( carreras => this.carreras = carreras );
  }

  enviarRL( id_partido, id_categoria, id_ta ) {
    const valor1 = $('#RL0' + id_partido).text();
    const valor2 = $('#RL1' + id_partido).text();

    const resultado = valor1 + '!' + valor2;

    this._partidosService.enviarRL( id_partido, id_categoria, id_ta, resultado)
    .subscribe( resp => {
      console.log( resp );
    } );
  }

  enviarCB ( id_carrera ) {
    const cab1 = $('#' + id_carrera + 'cab1').val();
    const cab2 = $('#' + id_carrera + 'cab2').val();
    const cab3 = $('#' + id_carrera + 'cab3').val();

    const div1 = $('#' + id_carrera + 'div1').text();
    const div2 = $('#' + id_carrera + 'div2').text();
    const div3 = $('#' + id_carrera + 'div3').text();

    const dato = cab1 + '#' + div1 + '!' + cab2 + '#' + div2 + '!' + cab3 + '#' + div3;

    this._partidosService.enviarCB( id_carrera, dato )
    .subscribe( resp => {
      console.log( resp );
    } );
  }



}

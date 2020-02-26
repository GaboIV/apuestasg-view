import { Component, OnInit } from '@angular/core';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { DeportesService } from '../../servicios/deportes.service';
import { Deporte } from '../../modelos/deporte';
import { PartidosService } from '../../servicios/partidos.service';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { LigasService } from 'src/app/servicios/ligas.service';
import swal from 'sweetalert2';

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
  nacionalidades: Nacionalidad[];

  category_id = 0;
  country_id = 0;
  start = 0;

  criterio = 'todos';

  constructor(
    public _deporteService: DeportesService,
    public _partidosService: PartidosService,
    public _nacionalidadesService: NacionalidadesService,
    public _ligasService: LigasService,
  ) { }

  ngOnInit() {
    this.cargarDeportes();
    this.cargarNacionalidades();
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
      .subscribe(nacionalidades => this.nacionalidades = nacionalidades);
  }

  cargarDeportes() {
    this._deporteService.cargarDeportes()
          .subscribe( deportes => this.deportes = deportes );
  }

  seleccionHipodromo( seleccion ) {
    this.partidos = null;
    this.carreras = null;
    this._partidosService.seleccionHipodromo( seleccion )
      .subscribe( carreras => this.carreras = carreras );
  }

  enviarRL( id_partido, id_categoria, id_ta, partido: any ) {
    const valor1 = $('#RL0' + id_partido).text();
    const valor2 = $('#RL1' + id_partido).text();

    const resultado = valor1 + '!' + valor2;

    this._partidosService.enviarRL( id_partido, id_categoria, id_ta, resultado)
    .subscribe( resp => {
      if (resp.status == 'correcto'){
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          toast({
            type: 'success',
            title: 'Se agregó el resultado correctamente'
          });

          partido.status = 3;
        }
    } );
  }

  enviarCB ( id_carrera, carrera ) {
    const cab1 = $('#' + id_carrera + 'cab1').val();
    const cab2 = $('#' + id_carrera + 'cab2').val();
    const cab3 = $('#' + id_carrera + 'cab3').val();

    const div1 = $('#' + id_carrera + 'div1').text();
    const div2 = $('#' + id_carrera + 'div2').text();
    const div3 = $('#' + id_carrera + 'div3').text();

    const dato = cab1 + '#' + div1 + '!' + cab2 + '#' + div2 + '!' + cab3 + '#' + div3;

    this._partidosService.enviarCB( id_carrera, dato )
    .subscribe( resp => {
      if (resp.status == 'correcto'){
        const toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });
        toast({
          type: 'success',
          title: 'Se agregó el resultado correctamente'
        });

        carrera.status = 3;
      }
    });
  }

  changeCountry() {
    this.ligas = null;
    this._ligasService.seleccionDeportePais(this.category_id, this.country_id)
    .subscribe(resp => {
      this.ligas = resp.ligas;
    });
  }

  changeCategory() {
    if (this.country_id != 0) {
      this.ligas = null;
      this._ligasService.seleccionDeportePais(this.category_id, this.country_id)
      .subscribe(resp => {
        this.ligas = resp.ligas;
      });
    }    
  }

  filtrarPartidos(pagina) {
    if (this.category_id != 7) {
      this._partidosService.filtrarPartidosResult(pagina, this.category_id, this.country_id, this.start, this.criterio)
      .subscribe(resp => {
        console.log(resp);
        this.partidos = resp.games.data
      });
    } else {
      this._partidosService.filtrarCarrerasResult(this.category_id, this.start, null)
      .subscribe(resp => {
        console.log(resp);
        this.partidos = [];
        this.carreras = resp.carreras
      });
    }
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { Equipo } from '../../modelos/equipos';
import { Partido } from '../../modelos/partido';
import { Router, ActivatedRoute } from '@angular/router';
import { EquiposService } from '../../servicios/equipos.service';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';
import { PartidosService } from '../../servicios/partidos.service';
import { Deporte } from '../../modelos/deporte';
import { DeportesService } from '../../servicios/deportes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css']
})
export class PartidosComponent implements OnInit {

  equipos: Equipo[];
  partidos: Partido[];
  nacionalidades: Nacionalidad[];
  resultado: any;
  today: Date = new Date('2016-01-16T16:00:00');
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';

  deportes: Deporte[];
  ligas: any = [];

  criterio = 'todos';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _equipoService: EquiposService,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    public _partidosService: PartidosService,
    public _deportesService: DeportesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cargarPartidos(this.pagina, 'todos');
    this.cargarDeportes();
  }

  cargarDeportes() {
    this._deportesService.cargarDeportes()
      .subscribe(deportes => this.deportes = deportes);
  }

  seleccionDeporte(seleccion) {
    this.ligas = null;
    this._deportesService.seleccionDeporte(seleccion)
      .subscribe(ligas => {
        this.ligas = ligas;
      });
  }

  seleccionLiga(seleccion) {
    this.partidos = null;

    this.criterio = '-' + seleccion;

    this._partidosService.cargarPartidos(1, '-' + seleccion)
      .subscribe(partidos => this.partidos = partidos);
  }

  cargarPartidos(pagina, criterio) {
    this._partidosService.cargarPartidos(pagina, criterio)
      .subscribe(partidos => {
        this.partidos = partidos.data
        console.log(partidos);
      });
  }

  subirImagen(event, partido) {
    this.selectedFile = event.target.files[0];
    this._generalesService.subirImagen(partido.id_partido, this.selectedFile, 'partidos')
      .subscribe(res => {
        this.resultado = res;
        console.log(this.resultado);
        partido.img = this.resultado.imagen;
      });
  }

  cambiarEstado(partido: Partido) {
    this._partidosService.actualizarEstado(partido.id, partido.outstanding)
      .subscribe(res => {
        console.log(res);
      });
  }

  cambiarPagina(valor: string) {

    if (valor === 'a') {
      this.pagina = this.pagina + 1;
      this.cargarPartidos(this.pagina, this.criterio);

      if (this.pagina !== 1) {
        this.desactivar = 'color_grey';
      }
    }

    if (valor === 'b' && this.pagina > 1) {
      this.pagina = this.pagina - 1;
      this.cargarPartidos(this.pagina, this.criterio);

      if (this.pagina === 1) {
        this.desactivar = 'disabled';
      }
    }
  }

  cambiarLive(partido: Partido) {
    this._partidosService.actualizarPartido(partido)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  verficarEdad(partido: Partido) {
    return true;
  }

  anularPartido(partido: Partido) {
    const swalWithBootstrapButtons = swal.mixin({});

    swalWithBootstrapButtons({
      title: '¿Deseas anular este partido?',
      // tslint:disable-next-line:max-line-length
      html: 'Partido: ',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._partidosService.anularPartido(partido)
          .subscribe(resp => {
            if (resp.status === 'correcto') {
              swalWithBootstrapButtons(
                '¡Partido anulado!',
                'Operación realizada correctamente',
                'success'
              );
              // partido.eventos[0] = 'Cancelado';
            }
          });
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
      }
    });
  }

}

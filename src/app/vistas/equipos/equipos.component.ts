import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EquiposService, NacionalidadesService } from '../../servicios/servicios.indice';
import { Equipo } from '../../modelos/equipos';
import { HttpClient } from '@angular/common/http';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { GeneralesService } from '../../servicios/generales.service';
import { Liga } from '../../modelos/ligas';
import { URL_A_FUNC } from '../../comun/link';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  equipos: Equipo[] = [];
  nacionalidades: Nacionalidad[];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';
  liga = 'todas';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _equipoService: EquiposService,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
  ) { }

  ngOnInit() {
    this.cargarEquipos(this.pagina, 'todos', 'todas');
    this.cargarNacionalidades();
  }

  cargarEquipos(pagina, criterio, liga) {
    this._equipoService.cargarEquipos(pagina, criterio, liga)
      .subscribe(equipos => {
        this.equipos = equipos.data
      });
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
      .subscribe(nacionalidades => this.nacionalidades = nacionalidades);
  }

  cambiarEdit() {
    this.mostrarEdit = true;
  }

  ocultarEdit(equipo: Equipo) {
    console.log(equipo);
    this.mostrarEdit = false;
    this._equipoService.actualizarEquipo(equipo)
      .subscribe(res => {
        console.log(res);
      });
  }

  subirImagen(event, equipo) {
    this.selectedFile = event.target.files[0];
    this._generalesService.subirImagen(equipo.id_equipo, this.selectedFile, 'equipos')
      .subscribe(res => {
        this.resultado = res;
        console.log(this.resultado);
        equipo.img = this.resultado.imagen;
      });
  }

  buscarElemento(valor: string) {
    if (valor === '') {
      valor = 'todos';
    }
    this.cargarEquipos(this.pagina, valor, 'todas');
  }

  cambiarPagina(valor: string) {
    if (valor === 'a') {
      this.pagina = this.pagina + 1;
      this.cargarEquipos(this.pagina, 'todos', 'todas');

      if (this.pagina !== 1) {
        this.desactivar = 'color_grey';
      }
    }

    if (valor === 'b' && this.pagina > 1) {
      this.pagina = this.pagina - 1;
      this.cargarEquipos(this.pagina, 'todos', 'todas');

      if (this.pagina === 1) {
        this.desactivar = 'disabled';
      }
    }
  }

  ligaCa(liga: Liga) {
    this.cargarEquipos(1, 'todos', liga.id);
  }

}

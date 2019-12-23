import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EquiposService, NacionalidadesService } from '../../servicios/servicios.indice';
import { Equipo } from '../../modelos/equipos';
import { HttpClient } from '@angular/common/http';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { GeneralesService } from '../../servicios/generales.service';
import { Liga } from '../../modelos/ligas';
import { URL_A_FUNC } from '../../comun/link';
import swal from 'sweetalert2';

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
  total = 0;
  criterio = '';

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
    this.criterio = criterio;
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando equipos'
    });
    this._equipoService.cargarEquipos(pagina, criterio, liga)
      .subscribe(equipos => {
        this.equipos = equipos.data
        this.total = equipos.total;
        this.pagina = equipos.current_page;
        swal.close();
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
    this._generalesService.subirImagen(equipo.id, this.selectedFile, 'teams')
      .subscribe(res => {
        this.resultado = res;
        equipo.image = this.resultado.image;
      });
  }

  buscarElemento(valor: string) {
    if (valor === '') {
      valor = 'todos';
    }

    this.cargarEquipos(this.pagina, valor, 'todas');
  }

  pageChanged (page) {
    this.pagina = page;

  }

  modificarDato (id, value, equipo, parameter, sp_parameter = '') {
    if (value != equipo[parameter] && (value != '' || equipo[parameter] != null) ) {
      this._equipoService.modificarDatoEquipo(id, value, parameter)
      .subscribe(res => {
        console.log(res);
        if (res.status == 'success') {
          equipo[parameter] = value;
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          toast({
            type: res.status,
            title: 'Se modificó el campo ' + sp_parameter + 'correctamente'
          });
        }
      });
    }
  }

  ligaCa(liga: Liga) {
    this.cargarEquipos(1, 'todos', liga.id);
  }

}

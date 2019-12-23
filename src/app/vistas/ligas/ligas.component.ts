import { Component, OnInit } from '@angular/core';
import { Liga } from '../../modelos/ligas';
import { Router, ActivatedRoute } from '@angular/router';
import { LigasService } from '../../servicios/ligas.service';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { HttpClient } from '@angular/common/http';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { Deporte } from '../../modelos/deporte';
import { DeportesService } from '../../servicios/deportes.service';
import { GeneralesService } from '../../servicios/generales.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-ligas',
  templateUrl: './ligas.component.html',
  styleUrls: ['./ligas.component.css']
})
export class LigasComponent implements OnInit {

  ligas: Liga[] = [];
  nacionalidades: Nacionalidad[];
  deportes: Deporte[];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  liguias: Liga[] = [];
  desactivar = 'disabled';

  criterio = '';
  total = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _ligasService: LigasService,
    public _deporteService: DeportesService,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.ligas = JSON.parse(localStorage.getItem('ligas'));

    this.cargarLigas(this.pagina, 'todas');
    this.cargarNacionalidades();
    this.cargarDeportes();
  }

  cargarLigas(pagina, criterio) {
    this.criterio = criterio;
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando ligas'
    });
    this._ligasService.cargarLigas(pagina, criterio)
      .subscribe(ligas => {
        this.ligas = ligas.data;
        this.total = ligas.total;
        this.pagina = ligas.current_page;
        swal.close();
        localStorage.setItem('ligas', JSON.stringify(ligas.data));
      });
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
      .subscribe(nacionalidades => this.nacionalidades = nacionalidades);
  }

  cargarDeportes() {
    this._deporteService.cargarDeportes()
      .subscribe(deportes => this.deportes = deportes);
  }

  cambiarEdit() {
    this.mostrarEdit = true;
  }

  ocultarEdit(liga: Liga) {
    console.log(liga);
    this.mostrarEdit = false;
    this._ligasService.actualizarLiga(liga)
      .subscribe(res => {
        console.log(res);
      });
  }

  subirImagen(event, liga) {
    this.selectedFile = event.target.files[0];
    this._generalesService.subirImagen(liga.id, this.selectedFile, 'leagues')
      .subscribe(res => {
        this.resultado = res;
        liga.image = this.resultado.image;
      });
  }

  cambiarPagina(valor: string) {
    if (valor === 'a') {
      this.pagina = this.pagina + 1;
      this.cargarLigas(this.pagina, 'todas');

      if (this.pagina !== 1) {
        this.desactivar = 'color_grey';
      }
    }

    if (valor === 'b' && this.pagina > 1) {
      this.pagina = this.pagina - 1;
      this.cargarLigas(this.pagina, 'todas');

      if (this.pagina === 1) {
        this.desactivar = 'disabled';
      }
    }
  }

  modificarDato(id, value, liga, parameter, sp_parameter = '') {
    if (value != liga[parameter] && (value != '' || liga[parameter] != null)) {
      this._ligasService.modificarDatoLiga(id, value, parameter)
        .subscribe(res => {
          if (res.status == 'success') {
            liga[parameter] = value;
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

  buscarElemento(valor: string) {
    this.liguias = [];

    if (valor !== '') {
      const busqueda = new RegExp(valor, 'i');
      const liguias = this.ligas.filter(ligas => busqueda.test(ligas.name));

      this.liguias = liguias;
    }
  }

}

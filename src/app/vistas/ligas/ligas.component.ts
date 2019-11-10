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
    this._ligasService.cargarLigas(pagina, criterio)
      .subscribe(ligas => {
        this.ligas = ligas.data;
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
    this._generalesService.subirImagen(liga.id_liga, this.selectedFile, 'ligas')
      .subscribe(res => {
        this.resultado = res;
        console.log(this.resultado);
        liga.img = this.resultado.imagen;
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

  buscarElemento(valor: string) {
    this.liguias = [];

    if (valor !== '') {
      const busqueda = new RegExp(valor, 'i');
      const liguias = this.ligas.filter(ligas => busqueda.test(ligas.name));

      console.log(liguias);

      this.liguias = liguias;
    }
  }

}

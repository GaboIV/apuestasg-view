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

    this.cargarLigas(this.pagina, 'todas', 'todas');
    this.cargarNacionalidades();
    this.cargarDeportes();
  }

  cargarLigas(pagina, criterio, liga) {
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
    this._ligasService.cargarLigas(pagina, criterio, liga)
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
      this.cargarLigas(this.pagina, 'todas', 'todas');

      if (this.pagina !== 1) {
        this.desactivar = 'color_grey';
      }
    }

    if (valor === 'b' && this.pagina > 1) {
      this.pagina = this.pagina - 1;
      this.cargarLigas(this.pagina, 'todas', 'todas');

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
    if (valor === '') {
      valor = 'todas';
    }

    this.cargarLigas(this.pagina, valor, 'todas');
  }

  sync(id) {

    $('#spinact_' + id).addClass(' fa-spin ');

    this._ligasService.sync(id)
    .subscribe( resp => {      
        $('#spinact_' + id).removeClass('fa-spin');
        console.log(resp);
    });
  }

  dettach_name_uk (liga: Liga, name_uk) {
    swal({
      title: '¿Estás seguro de eliminar el sub-identificador ' + name_uk + '?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#cfcfcf',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: '<span style="color: #444">Cancelar</span>'
    }).then((result) => {
      if (result.value) {
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 15000
        });
        Toast({
          type: 'info',
          title: 'Eliminando sub-identificador'
        });
        this._ligasService.dettach_name_uk(liga, name_uk)
        .subscribe( resp => {
            liga.name_uk = resp.league.name_uk;
        });
      }
    }) 

    // this._ligasService.dettach_name_uk(liga, name_uk)
    // .subscribe( resp => {
    //     liga.name_uk = resp.league.name_uk;
    // });
  }

  attach_name_uk (liga: Liga, name_uk) {
    swal({
      title: 'Escriba el nuevo sub-identificador de la liga',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (name_uk) => {
        return this._ligasService.attach_name_uk(liga, name_uk)
                .subscribe( resp => {
                    liga.name_uk = resp.league.name_uk;
                    swal.close();
                });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        const Toast = swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 15000
        });
        Toast({
          type: 'info',
          title: 'Agregando sub-identificador'
        });
      }
    })
  }

}

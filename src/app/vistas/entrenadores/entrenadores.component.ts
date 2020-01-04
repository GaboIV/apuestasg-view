import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { Entrenador } from '../../modelos/entrenadores';
import swal from 'sweetalert2';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css']
})
export class EntrenadoresComponent implements OnInit {

  entrenadores: Entrenador[] = [];
  entrenados: Entrenador[] = [];

  criterio = 'todos';
  pagina = 1;
  total = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService
  ) { }

  ngOnInit() {
    this.entrenadoresStorage();
  }

  entrenadoresStorage () {
    if ( localStorage.getItem('entrenadores') !== null ) {
      this.entrenadores = JSON.parse( localStorage.getItem('entrenadores') );
      this.total = JSON.parse( localStorage.getItem('total_entrenadores') );
    } else {
      console.log ( 'No hay entrenadores' );
    }
  }

  buscarEntrenadores ( nombre ) {
    this.entrenados = [];
    if ( nombre !== '') {
      const busqueda = new RegExp(nombre, 'i');
      const entrenados = this.entrenadores.filter( entrenador => busqueda.test( entrenador.nombre ) );
      this.entrenados = entrenados;
    }
  }

  cargarEntrenadores(page: number, criterios: string = this.criterio) {
    this.criterio = criterios;

    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando entrenadores'
    });

    $('#spinact').addClass(' fa-spin ');

    this._caballoService.cargarEntrenadores(page, criterios)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.entrenadores = resp.trainers.data;
        this.total = resp.trainers.total;
        this.pagina = resp.trainers.current_page;

        $('#spinact').removeClass('fa-spin');

        localStorage.setItem('entrenadores', JSON.stringify(resp.trainers.data) );
        localStorage.setItem('act_entrenadores', JSON.stringify(resp.time) );
        localStorage.setItem('total_entrenadores', JSON.stringify(resp.trainers.total) );
        this._caballoService.act_entrenadores = resp.time;

        swal.close();
      }
    });
  }

  buscarElemento(valor: string) {
    if (valor === '') {
      valor = 'todos';
    }

    this.cargarEntrenadores(1, valor);
  }
}

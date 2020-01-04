import { Component, OnInit } from '@angular/core';
import { CaballosService } from '../../servicios/caballos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Jinete } from '../../modelos/jinetes';
import swal from 'sweetalert2';

@Component({
  selector: 'app-jinetes',
  templateUrl: './jinetes.component.html',
  styleUrls: ['./jinetes.component.css']
})
export class JinetesComponent implements OnInit {

  jinetes: Jinete[] = [];

  jienetes: Jinete[] = [];

  criterio = 'todos';
  pagina = 1;
  total = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService
  ) { }

  ngOnInit() {
    this.jinetesStorage();
  }

  cargarJinetes(page: number, criterios: string = this.criterio) {
    this.criterio = criterios;

    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando jinetes'
    });

    $('#spinact').addClass(' fa-spin ');

    this._caballoService.cargarJinetes(page, criterios)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.jinetes = resp.jockeys.data;
        this.total = resp.jockeys.total;
        this.pagina = resp.jockeys.current_page;

        $('#spinact').removeClass('fa-spin');

        localStorage.setItem('jinetes', JSON.stringify(resp.jockeys.data) );
        localStorage.setItem('act_jinetes', JSON.stringify(resp.time) );
        localStorage.setItem('total_jinetes', JSON.stringify(resp.jockeys.total) );
        this._caballoService.act_jinetes = resp.time;

        swal.close();
      }
    });
  }

  jinetesStorage () {
    if ( localStorage.getItem('jinetes') !== null ) {
      this.jinetes = JSON.parse( localStorage.getItem('jinetes') );
      this.total = JSON.parse( localStorage.getItem('total_jinetes') );
    } else {
      console.log ( 'No hay jinetes' );
    }
  }

  buscarJinete ( nombre ) {
    this.jienetes = [];

    if ( nombre !== '') {
      const busqueda = new RegExp(nombre, 'i');
      const jienetes = this.jinetes.filter( jinetes => busqueda.test( jinetes.nombre ) );
      this.jienetes = jienetes;
    }
  }

  buscarElemento(valor: string) {
    if (valor === '') {
      valor = 'todos';
    }

    this.cargarJinetes(1, valor);
  }
}

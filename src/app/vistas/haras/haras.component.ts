import { Component, OnInit } from '@angular/core';
import { Haras } from '../../modelos/haras';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-haras',
  templateUrl: './haras.component.html',
  styleUrls: ['./haras.component.css']
})
export class HarasComponent implements OnInit {

  haras: Haras[] = [];
  harias: Haras[] = [];

  criterio = 'todos';
  pagina = 1;
  total = 50;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.harasStorage();
  }

  harasStorage () {
    if ( localStorage.getItem('haras') !== null ) {
      this.haras = JSON.parse( localStorage.getItem('haras') );
      this.total = JSON.parse( localStorage.getItem('total_haras') );
    } else {
      console.log ( 'No hay haras' );
    }
  }

  buscarHaras ( descripcion ) {
    this.harias = [];
    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const harias = this.haras.filter( hara => busqueda.test( hara.name ) );
      this.harias = harias;
    }
  }

  cargarHaras() {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando haras'
    });

    $('#spinact').addClass(' fa-spin ');

    this._caballoService.cargarHaras()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.haras = resp.haras;
        // this.total = resp.jockeys.total;
        // this.pagina = resp.jockeys.current_page;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('haras', JSON.stringify(resp.haras) );
        localStorage.setItem('act_haras', JSON.stringify(resp.time) );
        this._caballoService.act_haras = resp.time;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Hipodromo } from '../../modelos/hipodromo';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hipodromos',
  templateUrl: './hipodromos.component.html',
  styleUrls: ['./hipodromos.component.css']
})
export class HipodromosComponent implements OnInit {

  hipodromos: Hipodromo[] = [];

  hipodromo: Hipodromo = new Hipodromo('', '', '', '', '');

  hipos: Hipodromo[] = [];

  nuevo = null;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hipodromosStorage();
  }

  hipodromosStorage () {
    if ( localStorage.getItem('hipodromos') !== null ) {
      this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
    } else {
      console.log ( 'No hay hipodromos' );
    }
  }

  cargarHipodromos() {
    $('#spinact').addClass(' fa-spin ');
    this._caballoService.cargarHipodromos()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.hipodromos = resp.hipodromos;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('hipodromos', JSON.stringify(resp.hipodromos) );
        localStorage.setItem('act_hipodromos', JSON.stringify(resp.actualizacion) );
        this._caballoService.act_hipodromos = resp.actualizacion;
      }
    });
  }

  buscarHipodromo ( descripcion ) {
    this.hipos = [];

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const hipos = this.hipodromos.filter( hipodromos => busqueda.test( hipodromos.descripcion ) );
      this.hipos = hipos;
    }
  }

  empezarNuevo () {
    this.nuevo = 'nuevo';
  }

  resetPage () {
    this.nuevo = null;
  }

  enviarDatos() {
    console.log( this.hipodromo );
    this._caballoService.crearHipodromo( this.hipodromo )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.toastr.success('Correcto', 'Hipódromo guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
        this.hipodromos.push( res.hipodromo );
        this.hipodromos.sort((a, b) => (a.descripcion > b.descripcion) ? 1 : ((b.descripcion > a.descripcion) ? -1 : 0));
        localStorage.setItem('hipodromos', JSON.stringify(this.hipodromos) );
        this.nuevo = null;
      } else {

      }
    });
  }



}

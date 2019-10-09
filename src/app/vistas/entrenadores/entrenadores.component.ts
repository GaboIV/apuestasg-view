import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { Entrenador } from '../../modelos/entrenadores';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css']
})
export class EntrenadoresComponent implements OnInit {

  entrenadores: Entrenador[] = [];
  entrenados: Entrenador[] = [];

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

  cargarEntrenadores() {
    $('#spinact').addClass(' fa-spin ');
    this._caballoService.cargarEntrenadores()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.entrenadores = resp.entrenadores;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('entrenadores', JSON.stringify(resp.entrenadores) );
        localStorage.setItem('act_entrenadores', JSON.stringify(resp.actualizacion) );
        this._caballoService.act_entrenadores = resp.actualizacion;
      }
    });
  }

}

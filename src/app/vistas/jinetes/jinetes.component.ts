import { Component, OnInit } from '@angular/core';
import { CaballosService } from '../../servicios/caballos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Jinete } from '../../modelos/jinetes';

@Component({
  selector: 'app-jinetes',
  templateUrl: './jinetes.component.html',
  styleUrls: ['./jinetes.component.css']
})
export class JinetesComponent implements OnInit {

  jinetes: Jinete[] = [];

  jienetes: Jinete[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService
  ) { }

  ngOnInit() {
    this.jinetesStorage();
  }

  cargarJinetes() {
    $('#spinact').addClass(' fa-spin ');
    this._caballoService.cargarJinetes()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.jinetes = resp.jinetes;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('jinetes', JSON.stringify(resp.jinetes) );
        localStorage.setItem('act_jinetes', JSON.stringify(resp.actualizacion) );
        this._caballoService.act_jinetes = resp.actualizacion;
      }
    });
  }

  jinetesStorage () {
    if ( localStorage.getItem('jinetes') !== null ) {
      this.jinetes = JSON.parse( localStorage.getItem('jinetes') );
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

}

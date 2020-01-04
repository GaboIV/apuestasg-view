import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../modelos/carrera';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { Hipodromo } from '../../modelos/hipodromo';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras: Carrera[] = [];
  hipodromos: Hipodromo[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService
  ) { }

  ngOnInit() {
    this.carreras = JSON.parse( localStorage.getItem('carreras'));
    this.cargarCarreras();
  }

  cargarCarreras() {
    this._caballoService.cargarCarreras('todas')
    .subscribe( resp => {
      this.carreras = resp.carreras.data;
      localStorage.setItem('carreras', JSON.stringify(resp.carreras.data) );
    } );
  }
}

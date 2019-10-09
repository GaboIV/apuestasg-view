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
    this.carreras = JSON.parse( localStorage.getItem('carreras') );
    this.cargarCarreras();

    this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
    this.cargarHipodromos();
  }

  cargarCarreras() {
    this._caballoService.cargarCarreras('todas')
          .subscribe( resp => {
            this.carreras = resp.carreras;
            localStorage.setItem('carreras', JSON.stringify(resp.carreras) );
          } );
  }

  cargarHipodromos() {
    this._caballoService.cargarHipodromos()
          .subscribe( hipodromos => {
            this.hipodromos = hipodromos;
            localStorage.setItem('hipodromos', JSON.stringify(hipodromos) );
          } );
  }

}

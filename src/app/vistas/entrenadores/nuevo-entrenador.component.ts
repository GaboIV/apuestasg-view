import { Component, OnInit } from '@angular/core';
import { Entrenador } from '../../modelos/entrenadores';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-entrenador',
  templateUrl: './nuevo-entrenador.component.html',
  styleUrls: ['./nuevo-entrenador.component.css']
})
export class NuevoEntrenadorComponent implements OnInit {

  entrenador: Entrenador = new Entrenador('', 0, '', '');
  mostrarError = false;
  entrenadores: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballosService: CaballosService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    $('#name_hrs').focus();
  }

  enviarDatos() {
    this._caballosService.crearEntrenador( this.entrenador )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.entrenadores = JSON.parse( localStorage.getItem('entrenadores') );
        this.entrenadores.push( res.entrenador );
        this.entrenadores.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
        localStorage.setItem('entrenadores', JSON.stringify(this.entrenadores) );

        this.toastr.success('Correcto', 'Entrenador guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/entrenadores']);
      } else {
        
      }
    });
  }

}

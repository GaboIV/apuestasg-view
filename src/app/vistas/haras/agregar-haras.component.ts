import { Component, OnInit } from '@angular/core';
import { Haras } from '../../modelos/haras';
import { HttpClient } from '@angular/common/http';
import { CaballosService } from '../../servicios/caballos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-haras',
  templateUrl: './agregar-haras.component.html',
  styleUrls: ['./agregar-haras.component.css']
})
export class AgregarHarasComponent implements OnInit {

  haras: Haras = new Haras('', '', '');
  mostrarError = false;

  harass: any;

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
    this._caballosService.crearHaras( this.haras )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.harass = JSON.parse( localStorage.getItem('haras') );
        this.harass.push( res.haras );
        this.harass.sort((a, b) => (a.descripcion > b.descripcion) ? 1 : ((b.descripcion > a.descripcion) ? -1 : 0));
        localStorage.setItem('haras', JSON.stringify(this.harass) );

        this.toastr.success('Correcto', 'Haras guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/haras']);
      } else {
      }
    });
  }

}

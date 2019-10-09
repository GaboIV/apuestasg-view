import { Component, OnInit } from '@angular/core';
import { Studs } from '../../modelos/studs';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-stud',
  templateUrl: './nuevo-stud.component.html',
  styleUrls: ['./nuevo-stud.component.css']
})
export class NuevoStudComponent implements OnInit {

  stud: Studs = new Studs('', '', '');
  mostrarError = false;

  studs: any;

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
    this._caballosService.crearStuds( this.stud )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.studs = JSON.parse( localStorage.getItem('studs') );
        this.studs.push( res.stud );
        this.studs.sort((a, b) => (a.descripcion > b.descripcion) ? 1 : ((b.descripcion > a.descripcion) ? -1 : 0));
        localStorage.setItem('studs', JSON.stringify(this.studs) );

        this.toastr.success('Correcto', 'Stud guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/studs']);
      } else {
        
      }
    });
  }

}

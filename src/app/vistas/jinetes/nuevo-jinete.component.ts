import { Component, OnInit } from '@angular/core';
import { Jinete } from '../../modelos/jinetes';
import { CaballosService } from '../../servicios/caballos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-jinete',
  templateUrl: './nuevo-jinete.component.html',
  styleUrls: ['./nuevo-jinete.component.css']
})
export class NuevoJineteComponent implements OnInit {

  jinete: Jinete = new Jinete('', '', '', 231, '', '');
  mostrarError = false;
  jinetes: any;

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
    this._caballosService.crearJinete( this.jinete )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.jinetes = JSON.parse( localStorage.getItem('jinetes') );
        this.jinetes.push( res.jinete );
        this.jinetes.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
        localStorage.setItem('jinetes', JSON.stringify(this.jinetes) );

        this.toastr.success('Correcto', 'Jinete guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/jinetes']);
      } else {
      }
    });
  }

}

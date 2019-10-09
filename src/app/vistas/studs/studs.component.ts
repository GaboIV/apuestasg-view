import { Component, OnInit } from '@angular/core';
import { Studs } from '../../modelos/studs';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studs',
  templateUrl: './studs.component.html',
  styleUrls: ['./studs.component.css']
})
export class StudsComponent implements OnInit {

  studs: Studs[] = [];

  selectedFile: File;
  resultado: any;

  studis: Studs[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    public _generalesService: GeneralesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.studsStorage();
  }

  studsStorage () {
    if ( localStorage.getItem('studs') !== null ) {
      this.studs = JSON.parse( localStorage.getItem('studs') );
    } else {
      console.log ( 'No hay studs' );
    }
  }

  cargarStuds() {
    $('#spinact').addClass(' fa-spin ');
    this._caballoService.cargarStuds()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.studs = resp.studs;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('studs', JSON.stringify(resp.studs) );
        localStorage.setItem('act_studs', JSON.stringify(resp.actualizacion) );
        this._caballoService.act_studs = resp.actualizacion;
      }
    });
  }

  buscarStud ( descripcion ) {

    this.studis = [];

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const studis = this.studs.filter( studs => busqueda.test( studs.descripcion ) );
      this.studis = studis;
    }
  }

  subirImagen(event, stud) {
    this.selectedFile = event.target.files[0];
    this._generalesService.subirImagen( stud.id_stud, this.selectedFile, 'studs' )
      .subscribe( res => {
        this.resultado = res;
        console.log ( this.resultado );
        stud.img = this.resultado.imagen;
      });
  }

  actualizarStud( stud: Studs ) {
    this._caballoService.actualizarStud( stud )
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        const foundIndex = this.studs.findIndex( x => x.id_stud === stud.id_stud);
          console.log( foundIndex );
          this.studs[foundIndex] = stud;

          localStorage.setItem('studs', JSON.stringify(this.studs) );

          this.toastr.success('Correcto', resp.mensaje, {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
      }
    });
  }

}

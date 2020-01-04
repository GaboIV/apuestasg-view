import { Component, OnInit } from '@angular/core';
import { Studs } from '../../modelos/studs';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { GeneralesService } from '../../servicios/generales.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

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

  criterio = 'todos';
  pagina = 1;
  total = 0;

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
      this.total = JSON.parse( localStorage.getItem('total_studs') );
    } else {
      console.log ( 'No hay studs' );
    }
  }

  cargarStuds(page: number, criterios: string = this.criterio) {
    this.criterio = criterios;

    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando studs'
    });

    $('#spinact').addClass(' fa-spin ');

    this._caballoService.cargarStuds(page, criterios)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.studs = resp.studs.data;
        this.total = resp.studs.total;
        this.pagina = resp.studs.current_page;

        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('studs', JSON.stringify(resp.studs.data) );
        localStorage.setItem('act_studs', JSON.stringify(resp.time) );
        localStorage.setItem('total_studs', JSON.stringify(resp.studs.total) );
        this._caballoService.act_studs = resp.time;

        swal.close();
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

  buscarElemento(valor: string) {
    if (valor === '') {
      valor = 'todos';
    }

    this.cargarStuds(1, valor);
  }
}

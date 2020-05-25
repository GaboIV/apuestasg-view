import { Component, OnInit } from '@angular/core';
import { Hipodromo } from '../../modelos/hipodromo';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { NacionalidadesService } from 'src/app/servicios/servicios.indice';
import { Nacionalidad } from 'src/app/modelos/nacionalidad';

@Component({
  selector: 'app-hipodromos',
  templateUrl: './hipodromos.component.html',
  styleUrls: ['./hipodromos.component.css']
})
export class HipodromosComponent implements OnInit {

  hipodromos: Hipodromo[] = [];
  nacionalidades: Nacionalidad[];
  hipodromo: Hipodromo = new Hipodromo('', '', '', '', '');

  hipos: Hipodromo[] = [];

  nuevo = null;

  currentDate = new Date();

  criterio = 'todos';
  pagina = 1;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    public _nacionalidadesService: NacionalidadesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hipodromosStorage();
    // this.cargarNacionalidades();
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
          .subscribe( nacionalidades => this.nacionalidades = nacionalidades );
  }

  hipodromosStorage () {
    if ( localStorage.getItem('hipodromos') !== null ) {
      this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
    } else {
      console.log ( 'No hay hipodromos' );
    }
  }

  cargarHipodromos() {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando hipódromos'
    });

    $('#spinact').addClass(' fa-spin ');

    this._caballoService.cargarHipodromos()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.hipodromos = resp.hipodromos;

        console.log(this.hipodromos);

        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('hipodromos', JSON.stringify(resp.hipodromos) );
        localStorage.setItem('act_hipodromos', JSON.stringify(resp.time) );
        this._caballoService.act_hipodromos = resp.time;
      }
    });
  }

  buscarHipodromo ( name ) {
    this.hipos = [];

    if ( name !== '') {
      const busqueda = new RegExp(name, 'i');
      const hipos = this.hipodromos.filter( hipodromos => busqueda.test( hipodromos.name ) );
      this.hipos = hipos;
    }
  }

  empezarNuevo () {
    this.nuevo = 'nuevo';
  }

  resetPage () {
    this.nuevo = null;
  }

  enviarDatos() {
    this._caballoService.crearHipodromo( this.hipodromo )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.toastr.success('Correcto', 'Hipódromo guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
        this.hipodromos.push( res.hipodromo );
        this.hipodromos.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        localStorage.setItem('hipodromos', JSON.stringify(this.hipodromos) );
        this.nuevo = null;
      } else {

      }
    });
  }

  syncRacecourse (racecoru, event) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Sincronizando datos'
    });

    let evento = event.split('-');
    let date = evento[1] + "-" + evento[2] + "-" + evento[0];

    console.log(date);
    
    this._caballoService.syncCareers(racecoru.id, date)
    .subscribe( resp => {
      console.log(resp);
      swal ('Datos sincronizados', resp, 'success');
    })
  }
}

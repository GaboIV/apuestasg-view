import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Carrera } from 'src/app/modelos/carrera';
import { CaballosService } from 'src/app/servicios/caballos.service';
import { Studs } from 'src/app/modelos/studs';
import { Caballo } from '../../modelos/caballos';
import { Jinete } from '../../modelos/jinetes';
import { Entrenador } from '../../modelos/entrenadores';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  carrera: Carrera[] = [];

  studs: Studs[] = [];
  studis: Studs[] = [];

  enviando = false;
  zona = 'inscripciones';
  agregarIns = 0;
  param = '';

  caballos: Caballo[] = [];
  caballios: Caballo[] = [];

  jinetes: Jinete[] = [];
  jineset: Jinete[] = [];

  entrenadores: Entrenador[] = [];
  enternadors: Entrenador[] = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _caballoService: CaballosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe( parametros => {
      const param = parametros.id_carrera;

      this.param = param;

      this._caballoService.cargarCarreras(param)
      .subscribe( resp => {
        this.carrera = resp.carreras;
      });
    });

    this.route.queryParams
    .subscribe(params => {
      this.zona = params.zona;
    });

    if ( localStorage.getItem('studs') !== null ) {
      this.studs = JSON.parse( localStorage.getItem('studs') );
    } else {
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

    if ( localStorage.getItem('caballos') !== null ) {
      this.caballos = JSON.parse( localStorage.getItem('caballos') );
    } else {
      this._caballoService.cargarCaballos(1)
      .subscribe( resp => {
        if ( resp.status === 'correcto') {
          this.caballos = resp.caballos;
          localStorage.setItem('caballos', JSON.stringify(resp.caballos) );
          localStorage.setItem('act_caballos', JSON.stringify(resp.actualizacion) );
          this._caballoService.act_caballos = resp.actualizacion;
        }
      });
    }

    if ( localStorage.getItem('jinetes') !== null ) {
      this.jinetes = JSON.parse( localStorage.getItem('jinetes') );
    } else {
      this._caballoService.cargarJinetes()
      .subscribe( resp => {
        if ( resp.status === 'correcto') {
          this.jinetes = resp.jinetes;
          localStorage.setItem('jinetes', JSON.stringify(resp.jinetes) );
          localStorage.setItem('act_jinetes', JSON.stringify(resp.actualizacion) );
          this._caballoService.act_jinetes = resp.actualizacion;
        }
      });
    }

    if ( localStorage.getItem('entrenadores') !== null ) {
      this.entrenadores = JSON.parse( localStorage.getItem('entrenadores') );
    } else {
      this._caballoService.cargarEntrenadores()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.entrenadores = resp.entrenadores;
        localStorage.setItem('entrenadores', JSON.stringify(resp.entrenadores) );
        localStorage.setItem('act_entrenadores', JSON.stringify(resp.actualizacion) );
        this._caballoService.act_entrenadores = resp.actualizacion;
      }
    });
    }
  }

  buscarCaballos ( descripcion, id_ins ) {
    $('.bjin').slideUp('500');
    $('.bent').slideUp('500');
    this.caballios = [];
    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const caballios = this.caballos.filter( caballos => busqueda.test( caballos.name ) );
      this.caballios = caballios;
    }

    $('#bcab-' + id_ins).slideDown(500);
  }

  buscarJinetes ( descripcion, id_ins, index ) {
    $('.bcab').slideUp('500');
    $('.bent').slideUp('500');
    this.jineset = [];
    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const jineset = this.jinetes.filter( jinetes => busqueda.test( jinetes.nombre ) );
      this.jineset = jineset;
    } else {
      this.carrera[0].inscritos[index].id_jinete = [];
    }

    $('#bjin-' + id_ins).slideDown(500);
  }

  buscarEntrenadores ( descripcion, id_ins, index ) {
    $('.bjin').slideUp('500');
    $('.becab').slideUp('500');
    this.enternadors = [];
    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const enternadors = this.entrenadores.filter( entrenadores => busqueda.test( entrenadores.nombre ) );
      this.enternadors = enternadors;
    } else {
      this.carrera[0].inscritos[index].id_entrenador = [];
    }

    $('#bent-' + id_ins).slideDown(500);
  }

  buscarStud ( descripcion, id_ins, nro, index ) {
    $('.bjin').slideUp('500');
    $('.becab').slideUp('500');
    $('.bent').slideUp('500');

    this.studis = [];

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const studis = this.studs.filter( studs => busqueda.test( studs.descripcion ) );
      this.studis = studis;
    } else {
      if ( nro === 1 ) {
        this.carrera[0].inscritos[index].id_stud = [];
      }
      if ( nro === 2 ) {
        this.carrera[0].inscritos[index].id_stud2 = [];
      }
    }

    $('#bus-' + nro + '-' + id_ins).slideDown(500);
  }

  ocultaBus (el, id_ins ) {
    $('#' + el + '-' + id_ins).slideUp(500);
  }

  guardarInfo () {
    console.log( this.carrera );
    this._caballoService.enviarCarrera( this.carrera[0] )
    .subscribe( resp => {
      console.log( resp );
    });
  }

  selStud ( index, nro, stud, id_ins ) {
    if ( nro === 1) {
      this.carrera[0].inscritos[index].id_stud = stud;
      $('#bus-1-' + id_ins).hide(100);
      $('#st1-' + id_ins).val(stud.descripcion);
    }
    if ( nro === 2) {
      this.carrera[0].inscritos[index].id_stud2 = stud;
      $('#bus-2-' + id_ins).hide(100);
      $('#st2-' + id_ins).val(stud.descripcion);
    }
  }

  selCab ( index, cab, id_ins ) {
      this.carrera[0].inscritos[index].id_caballo = cab;
      $('#bcab-' + id_ins).slideUp(500);
      $('#cb-' + id_ins).val(cab.nombre);
  }

  selJin ( index, jin, id_ins ) {
    this.carrera[0].inscritos[index].id_jinete = jin;
    $('#bjin-' + id_ins).hide(100);
    $('#jt-' + id_ins).val(jin.nombre);
  }

  selEnt ( index, ent, id_ins ) {
    this.carrera[0].inscritos[index].id_entrenador = ent;
    $('#bent-' + id_ins).hide(100);
    $('#et-' + id_ins).val(ent.nombre);
  }

  agregarEjemps (agregarIns, id_carrera) {
    this._caballoService.agregarIns( agregarIns, id_carrera )
    .subscribe( resp => {
      if ( resp.mensaje === 'correcto') {
        this._caballoService.cargarCarreras(this.param)
        .subscribe( resp => {
          this.carrera = resp.carreras;
          this.toastr.success('Correcto', 'Se agregaron ' + resp.inscritos + ' ejemplares a la carrera', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          const navigationExtras: NavigationExtras = {
            queryParams: { 'zona': 'inscripciones' }
          };
          this.router.navigate(['/carrera/' + id_carrera], navigationExtras );
        });
      }
    });
  }

  muestraMens1 (id) {
    let muestra = 0;
    $('.mens2_e_i').fadeOut(500);
    if ( $('#dl1_' + id).is(':visible') === false) { muestra = 1; }
    $('.mens_e_i').fadeOut(500);

    if ( muestra === 1) {
        $('#dl1_' + id).fadeIn(500);
    }
  }

  muestraMens2 (id) {
    $('.mens2_e_i').fadeOut(500);

    $('#dl2_' + id).fadeToggle(500);
  }

  muestraMens3 (id) {
    $('.mens2_e_i').fadeOut(500);

    $('#dl3_' + id).fadeToggle(500);
  }

  retirar (ins, id_inscripcion) {
    this._caballoService.retirarIns( id_inscripcion )
    .subscribe( resp => {
      $('.mens2_e_i').fadeOut(500);
      $('.mens_e_i').fadeOut(500);

      if ( resp.status === 'correcto' ) {
        ins.status = '2';
        this.toastr.success('Correcto', resp.mensaje, {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      }

    });
  }

  eliminar (ins, id_inscripcion) {
    this._caballoService.eliminarIns( id_inscripcion )
    .subscribe( resp => {
      $('.mens2_e_i').fadeOut(500);
      $('.mens_e_i').fadeOut(500);

      ins.status = '99';

      if ( resp.status === 'correcto' ) {
        this.toastr.success('Correcto', resp.mensaje, {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
      }

    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Caballo } from '../../modelos/caballos';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { ToastrService } from 'ngx-toastr';
import { Haras } from 'src/app/modelos/haras';
import swal from 'sweetalert2';

@Component({
  selector: 'app-caballos',
  templateUrl: './caballos.component.html',
  styleUrls: ['./caballos.component.css']
})
export class CaballosComponent implements OnInit {

  caballos: Caballo[] = [];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';
  caballio: Caballo[] = [];
  caballosui: any;

  haras: Haras[] = [];
  harass: Haras[] = [];

  padrillosui: Caballo[] = [];
  padrillos: Caballo[] = [];

  madrillas: Caballo[] = [];
  madrillasui: Caballo[] = [];

  ins_har: any;
  ins_pad: any;
  ins_mad: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.caballosStorage();
    this.cargarCaballosUI();

    if ( localStorage.getItem('haras') !== null ) {
      this.haras = JSON.parse( localStorage.getItem('haras') );

      this._caballoService.cargarHaras()
      .subscribe( resp => {
        if ( resp.status === 'correcto') {
          this.haras = resp.haras;
          localStorage.setItem('haras', JSON.stringify(resp.haras) );
          localStorage.setItem('act_haras', JSON.stringify(resp.actualizacion) );
          this._caballoService.act_haras = resp.actualizacion;
        }
      });
    } else {
      this._caballoService.cargarHaras()
      .subscribe( resp => {
        if ( resp.status === 'correcto') {
          this.haras = resp.haras;
          localStorage.setItem('haras', JSON.stringify(resp.haras) );
          localStorage.setItem('act_haras', JSON.stringify(resp.actualizacion) );
          this._caballoService.act_haras = resp.actualizacion;
        }
      });
    }

    if ( localStorage.getItem('padrillosui') !== null ) {
      this.padrillos = JSON.parse( localStorage.getItem('padrillosui') );
      this._caballoService.cargarPadrillosUI()
      .subscribe( resp => {
          this.padrillos = resp;
          localStorage.setItem('padrillosui', JSON.stringify(resp) );
      });
    } else {
      this._caballoService.cargarPadrillosUI()
      .subscribe( resp => {
          this.padrillos = resp;
          localStorage.setItem('padrillosui', JSON.stringify(resp) );
      });
    }

    if ( localStorage.getItem('madrillasui') !== null ) {
      this.madrillas = JSON.parse( localStorage.getItem('madrillasui') );
      this._caballoService.cargarMadrillasUI()
      .subscribe( resp => {
          this.madrillas = resp;
          localStorage.setItem('madrillasui', JSON.stringify(resp) );
      });
    } else {
      this._caballoService.cargarMadrillasUI()
      .subscribe( resp => {
          this.madrillas = resp;
          localStorage.setItem('madrillasui', JSON.stringify(resp) );
      });
    }
  }

  cargarCaballos() {
    $('#spinact').addClass(' fa-spin ');
    this._caballoService.cargarCaballos()
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.caballos = resp.caballos;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('caballos', JSON.stringify(resp.caballos) );
        localStorage.setItem('act_caballos', JSON.stringify(resp.actualizacion) );
        this._caballoService.act_caballos = resp.actualizacion;
      }
    });
  }

  caballosStorage () {
    if ( localStorage.getItem('caballos') !== null ) {
      this.caballos = JSON.parse( localStorage.getItem('caballos') );
    } else {
      console.log ( 'No hay caballos' );
    }
  }

  cargarCaballosUI() {
    if ( localStorage.getItem('caballosui') !== null ) {
      this.caballosui = JSON.parse( localStorage.getItem('caballosui') );
    } else {
      this._caballoService.cargarCaballosUI()
      .subscribe( caballosui => {
        localStorage.setItem('caballosui', JSON.stringify(caballosui) );
      });
    }
  }

  buscarCaballo ( nombre ) {
    this.caballio = [];

    if ( nombre !== '') {
      const busqueda = new RegExp(nombre, 'i');
      const caballio = this.caballos.filter( caballo => busqueda.test( caballo.nombre ) );
      this.caballio = caballio;
    }

    console.log( this.caballio );
  }

  actualizarCaballo( caballo: Caballo) {
    this._caballoService.actualizarCaballo( caballo )
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
          caballo.edad = resp.edad;
          const foundIndex = this.caballos.findIndex( x => x.id_caballo === caballo.id_caballo);
          this.caballos[foundIndex] = caballo;

          localStorage.setItem('caballos', JSON.stringify(this.caballos) );

          this.toastr.success('Correcto', resp.mensaje, {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
      } else {
      }
    });
  }

  revisarMadre ( dato, caballo: Caballo ) {
    setTimeout(() => {
      if ( this.ins_mad !== '') {
        this.ins_har = '';
        this.ins_pad = '';
        this.ins_mad = '';

        const foundIndex = this.madrillas.findIndex( x => x.nombre === dato );
        console.log( foundIndex);

        if ( foundIndex === -1) {
          const swalWithBootstrapButtons = swal.mixin({});

          swalWithBootstrapButtons({
            title: '¿Deseas agregar a esta yegua madre?',
            html: 'Nombre: ' + dato,
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              this._caballoService.agregarMadrilla( dato, caballo )
              .subscribe( resp => {
                console.log( resp );
                if (resp.status === 'success') {
                  this.madrillas.push( resp.madre );
                  this.madrillas.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
                  localStorage.setItem('madrillasui', JSON.stringify(this.madrillas) );

                  const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  toast ({
                    type: resp.status,
                    title: resp.mstatus
                  });

                  caballo.madre = resp.madre;

                  const foundIndex2 = this.caballos.findIndex( x => x.id_caballo === caballo.id_caballo);
                  this.caballos[foundIndex2] = caballo;
                  localStorage.setItem('caballos', JSON.stringify(this.caballos));
                }
                if ( resp.status === 'existe') {
                  swal ('Partido existente', resp.mensaje, 'info');
                }
              });
            } else if (
              result.dismiss === swal.DismissReason.cancel
            ) {
            }
          });
        }
      }
    }, 100);
  }

  revisarPadre ( dato, caballo: Caballo ) {
   setTimeout(() => {
      if ( this.ins_pad !== '') {
        this.ins_har = '';
        this.ins_pad = '';
        this.ins_mad = '';

        const foundIndex = this.padrillos.findIndex( x => x.nombre === dato );

        if ( foundIndex === -1) {
          const swalWithBootstrapButtons = swal.mixin({});

          swalWithBootstrapButtons({
            title: '¿Deseas agregar a este padrillo?',
            html: 'Nombre: ' + dato,
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              this._caballoService.agregarPadrillo( dato, caballo )
              .subscribe( resp => {
                console.log( resp );
                if (resp.status === 'success') {
                  this.padrillos.push( resp.padre );
                  this.padrillos.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
                  localStorage.setItem('padrillosui', JSON.stringify(this.padrillos) );

                  const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                  });
                  toast ({
                    type: resp.status,
                    title: resp.mstatus
                  });

                  caballo.padre = resp.padre;

                  const foundIndex2 = this.caballos.findIndex( x => x.id_caballo === caballo.id_caballo);
                  this.caballos[foundIndex2] = caballo;
                  localStorage.setItem('caballos', JSON.stringify(this.caballos));

                }
                if ( resp.status === 'existe') {
                  swal ('Partido existente', resp.mensaje, 'info');
                }
              });
            } else if (
              result.dismiss === swal.DismissReason.cancel
            ) {
            }
          });
        }
      }
    }, 100);
  }

  buscarHaras ( descripcion, id_ins, index ) {
    $('.bpad').slideUp('500');
    $('.bmad').slideUp('500');

    this.harass = [];

    this.ins_har = id_ins;
    this.ins_pad = '';

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const harass = this.haras.filter( haras => busqueda.test( haras.descripcion ) );
      this.harass = harass;
    }

    $('#bhar-' + id_ins).slideDown(500);
  }

  selHar ( caballo, haras, id_ins ) {
    caballo.id_haras = haras;
    $('#bhar-' + id_ins).hide(100);

    $('#hr-' + id_ins).html(haras.descripcion);

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = '';

    this.actualizarCaballo( caballo );
  }


  buscarPadrillos ( descripcion, id_ins, index ) {
    $('.bhar').slideUp('500');
    $('.bmad').slideUp('500');

    this.ins_har = '';
    this.ins_pad = id_ins;

    this.padrillosui = [];

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const padrillosui = this.padrillos.filter( padrillos => busqueda.test( padrillos.nombre ) );
      this.padrillosui = padrillosui;
    }

    $('#bpad-' + id_ins).slideDown(500);
  }

  selPad ( caballo, padre, id_ins ) {
    caballo.padre = padre;
    $('#bhar-' + id_ins).hide(100);

    $('#pd-' + id_ins).html(padre.nombre);

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = '';

    this.actualizarCaballo( caballo );
  }

  buscarMadrillas ( descripcion, id_ins, index ) {
    $('.bhar').slideUp('500');
    $('.bpad').slideUp('500');

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = id_ins;

    this.madrillasui = [];

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const madrillasui = this.madrillas.filter( madrillas => busqueda.test( madrillas.nombre ) );
      this.madrillasui = madrillasui;
    }

    $('#bmad-' + id_ins).slideDown(500);
  }

  selMad ( caballo, madre, id_ins ) {
    caballo.madre = madre;
    $('#bhar-' + id_ins).hide(100);

    $('#md-' + id_ins).html(madre.nombre);

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = '';

    this.actualizarCaballo( caballo );
  }
}

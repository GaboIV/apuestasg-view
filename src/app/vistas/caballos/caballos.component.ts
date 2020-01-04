import { Component, OnInit } from '@angular/core';
import { Caballo } from '../../modelos/caballos';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { ToastrService } from 'ngx-toastr';
import { Haras } from 'src/app/modelos/haras';
import swal from 'sweetalert2';

declare var $: any;

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
  criterio = 'todos';

  haras: Haras[] = [];
  harass: Haras[] = [];

  padrillosui: Caballo[] = [];
  padrillos: Caballo[] = [];

  madrillas: Caballo[] = [];
  madrillasui: Caballo[] = [];

  ins_har: any;
  ins_pad: any;
  ins_mad: any;

  total = 0;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.caballosStorage();
    // this.cargarCaballosUI();

    if ( localStorage.getItem('haras') !== null ) {
      this.haras = JSON.parse( localStorage.getItem('haras') );

      // this._caballoService.cargarHaras()
      // .subscribe( resp => {
      //   if ( resp.status === 'correcto') {
      //     this.haras = resp.haras;
      //     localStorage.setItem('haras', JSON.stringify(resp.haras) );
      //     localStorage.setItem('act_haras', JSON.stringify(resp.time) );
      //     this._caballoService.act_haras = resp.time;
      //   }
      // });
    } else {
      this._caballoService.cargarHaras()
      .subscribe( resp => {
        if ( resp.status === 'correcto') {
          this.haras = resp.haras;
          localStorage.setItem('haras', JSON.stringify(resp.haras) );
          localStorage.setItem('act_haras', JSON.stringify(resp.time) );
          this._caballoService.act_haras = resp.time;
        }
      });
    }

    if ( localStorage.getItem('padrillosui') !== null ) {
      this.padrillos = JSON.parse( localStorage.getItem('padrillosui') );
      // this._caballoService.cargarPadrillosUI()
      // .subscribe( resp => {
      //     this.padrillos = resp;
      //     localStorage.setItem('padrillosui', JSON.stringify(resp) );
      // });
    } else {
      this._caballoService.cargarPadrillosUI()
      .subscribe( resp => {
          this.padrillos = resp.padrillosui;
          localStorage.setItem('padrillosui', JSON.stringify(resp.padrillosui) );
      });
    }

    if ( localStorage.getItem('madrillasui') !== null ) {
      this.madrillas = JSON.parse( localStorage.getItem('madrillasui') );
      // this._caballoService.cargarMadrillasUI()
      // .subscribe( resp => {
      //     this.madrillas = resp;
      //     localStorage.setItem('madrillasui', JSON.stringify(resp) );
      // });
    } else {
      this._caballoService.cargarMadrillasUI()
      .subscribe( resp => {
          this.madrillas = resp.madrillasui;
          localStorage.setItem('madrillasui', JSON.stringify(resp.madrillasui) );
      });
    }
  }

  cargarCaballos(page: number, criterios: string = this.criterio) {
    this.criterio = criterios;

    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 20000
    });
    toast({
      type: 'info',
      title: 'Cargando caballos'
    });

    $('#spinact').addClass(' fa-spin ');

    this._caballoService.cargarCaballos(page, criterios)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.caballos = resp.horses.data;
        this.total = resp.horses.total;
        this.pagina = resp.horses.current_page;
        $('#spinact').removeClass('fa-spin');
        localStorage.setItem('caballos', JSON.stringify(resp.horses.data) );
        localStorage.setItem('act_caballos', JSON.stringify(resp.time) );
        localStorage.setItem('total_caballos', JSON.stringify(resp.horses.total) );
        this._caballoService.act_caballos = resp.time;
        swal.close();
      }
    });
  }

  buscarElemento(valor: string) {
    if (valor === '') {
      valor = 'todos';
    }

    this.cargarCaballos(1, valor);
  }

  caballosStorage () {
    if ( localStorage.getItem('caballos') !== null ) {
      this.caballos = JSON.parse( localStorage.getItem('caballos') );
      this.total = JSON.parse( localStorage.getItem('total_caballos') );
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

  // buscarCaballo ( nombre ) {
  //   this.caballio = [];

  //   if ( nombre !== '') {
  //     const busqueda = new RegExp(nombre, 'i');
  //     const caballio = this.caballos.filter( caballo => busqueda.test( caballo.name ) );
  //     this.caballio = caballio;
  //   }

  //   console.log( this.caballio );
  // }

  actualizarCaballo( caballo: Caballo) {
    this._caballoService.actualizarCaballo( caballo )
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
          
          

          this.toastr.success('Correcto', resp.mensaje, {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
      } else {
      }
    });
  }

  modificarDato (caballo, value, parameter, sp_parameter = '') {
    if (value != caballo[parameter] && (value != '' || caballo[parameter] != null) ) {
      this._caballoService.modificarDatoCaballo(caballo.id, value, parameter)
      .subscribe(res => {
        if (res.status == 'success') {
          caballo.edad = res.horse.edad;

          const foundIndex = this.caballos.findIndex( x => x.id == caballo.id);
          this.caballos[foundIndex] = res.horse;

          localStorage.setItem('caballos', JSON.stringify(this.caballos) );

          caballo[parameter] = value;
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          toast({
            type: res.status,
            title: 'Se modificó el campo ' + sp_parameter + 'correctamente'
          });
        }
      });
    }
  }


  revisarMadre ( dato, caballo: Caballo ) {
    setTimeout(() => {
      if ( this.ins_mad !== '') {
        this.ins_har = '';
        this.ins_pad = '';
        this.ins_mad = '';

        const foundIndex = this.madrillas.findIndex( x => x.name === dato );

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
                  this.madrillas.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
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

        const foundIndex = this.padrillos.findIndex( x => x.name === dato );

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
                  this.padrillos.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
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

                  caballo.father = resp.padre;

                  const foundIndex2 = this.caballos.findIndex( x => x.id === caballo.id);
                  this.caballos[foundIndex2] = caballo;
                  localStorage.setItem('caballos', JSON.stringify(this.caballos));

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
      const harass = this.haras.filter( haras => busqueda.test( haras.name ) );
      this.harass = harass;
    }

    $('#bhar-' + id_ins).slideDown(500);
  }

  selHar ( caballo, haras, id_ins ) {
    caballo.haras = haras;
    $('#bhar-' + id_ins).hide(100);

    $('#hr-' + id_ins).html(haras.name);

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = '';

    this.modificarDato( caballo, haras.id, 'haras_id', 'haras ');
  }


  buscarPadrillos ( descripcion, id_ins, index ) {
    $('.bhar').slideUp('500');
    $('.bmad').slideUp('500');

    this.ins_har = '';
    this.ins_pad = id_ins;

    this.padrillosui = [];

    if ( descripcion !== '') {
      const busqueda = new RegExp(descripcion, 'i');
      const padrillosui = this.padrillos.filter( padrillos => busqueda.test( padrillos.name ) );
      this.padrillosui = padrillosui;
    }

    $('#bpad-' + id_ins).slideDown(500);
  }

  selPad ( caballo, padre, id_ins ) {
    caballo.father = padre;
    $('#bhar-' + id_ins).hide(100);
    $('#pd-' + id_ins).html(padre.nombre);

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = '';

    this.modificarDato( caballo, padre.id, 'father_id', 'padre ');
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
      const madrillasui = this.madrillas.filter( madrillas => busqueda.test( madrillas.name ) );
      this.madrillasui = madrillasui;
    }

    $('#bmad-' + id_ins).slideDown(500);
  }

  selMad ( caballo, madre, id_ins ) {
    caballo.mother = madre;
    $('#bhar-' + id_ins).hide(100);

    $('#md-' + id_ins).html(madre.nombre);

    this.ins_har = '';
    this.ins_pad = '';
    this.ins_mad = '';

    this.modificarDato( caballo, madre.id, 'mother_id', 'madre');
  }

  cargarMadrillasUI( dato ) {
    if ( dato === 'borrar') {
      $('#act_yeg').addClass(' fa-spin ');
      localStorage.removeItem('madrillasui');
    }

    if ( localStorage.getItem('madrillasui') !== null ) {
      this.madrillasui = JSON.parse( localStorage.getItem('madrillasui') );
    } else {
      this._caballoService.cargarMadrillasUI()
      .subscribe( resp => {
        this.madrillas = resp.madrillasui;
        $('#act_yeg').removeClass('fa-spin');
        localStorage.setItem('madrillasui', JSON.stringify(resp.madrillasui) );
      });
    }
  }

  cargarPadrillosUI( dato ) {
    if ( dato === 'borrar') {
      $('#act_pad').addClass(' fa-spin ');
      localStorage.removeItem('padrillosui');
    }

    if ( localStorage.getItem('padrillosui') !== null ) {
      this.padrillosui = JSON.parse( localStorage.getItem('padrillosui') );
    } else {
      this._caballoService.cargarPadrillosUI()
      .subscribe( resp => {
        this.padrillos = resp.padrillosui;
        $('#act_pad').removeClass('fa-spin');
        localStorage.setItem('padrillosui', JSON.stringify(resp.padrillosui) );
      });
    }
  }

  cargarHaras( dato ) {
    if ( dato === 'borrar') {
      $('#act_har').addClass(' fa-spin ');
      localStorage.removeItem('haras');
    }

    if ( localStorage.getItem('haras') !== null ) {
      this.haras = JSON.parse( localStorage.getItem('haras') );
    } else {
      this._caballoService.cargarHaras()
      .subscribe( resp => {
        $('#act_har').removeClass('fa-spin');
        this.haras = resp.haras;
        localStorage.setItem('haras', JSON.stringify(resp.haras) );
        localStorage.setItem('act_haras', JSON.stringify(resp.time) );
      });
    }
  }
}

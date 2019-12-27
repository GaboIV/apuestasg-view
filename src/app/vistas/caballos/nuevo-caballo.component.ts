import { Component, OnInit } from '@angular/core';
import { Caballo } from '../../modelos/caballos';
import { CaballosService } from '../../servicios/caballos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-nuevo-caballo',
  templateUrl: './nuevo-caballo.component.html',
  styleUrls: ['./nuevo-caballo.component.css']
})

export class NuevoCaballoComponent implements OnInit {

  caballo: Caballo = new Caballo('', '', '', 1, '', '', '', '', '2012-01-01', '', '');
  nacDia = '01';
  nacMes = '01';
  nacAnio = '2012';
  registro = false;
  padrillosui: any;
  madrillasui: any;
  haras: any;
  caballosui: any;

  caballos: Caballo[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballosService: CaballosService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cargarPadrillosUI('normal');
    this.cargarMadrillasUI('normal');
    this.cargarHarasUI('normal');
    $('#nombre_hrs').focus();
  }


  enviarDatos() {
    this.caballo.name = $('#nombre_hrs').val();
    this.caballo.father_id = $('#padre_hrs').val();
    this.caballo.mother_id = $('#madre_hrs').val();
    this.caballo.haras_id = $('#haras_hrs').val();

    this._caballosService.crearCaballo( this.caballo )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.toastr.success('Correcto', 'Ejemplar guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.caballos = JSON.parse( localStorage.getItem('caballos') );
        this.caballos.push( res.caballo );
        this.caballos.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        localStorage.setItem('caballos', JSON.stringify(this.caballos) );

        this.caballosui = JSON.parse( localStorage.getItem('caballosui') );
        this.caballosui.push( res.caballo.name );
        this.caballosui.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        localStorage.setItem('caballosui', JSON.stringify(this.caballosui) );

        this.padrillosui = JSON.parse( localStorage.getItem('padrillosui') );
        this.padrillosui.push( res.caballo.father.name );
        this.padrillosui.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        localStorage.setItem('padrillosui', JSON.stringify(this.padrillosui) );

        this.madrillasui = JSON.parse( localStorage.getItem('madrillasui') );
        this.madrillasui.push( res.caballo.mother.name );
        this.madrillasui.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        localStorage.setItem('madrillasui', JSON.stringify(this.madrillasui) );

        this.haras = JSON.parse( localStorage.getItem('haras') );
        this.haras.push( res.caballo.haras.descripcion );
        this.haras.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        localStorage.setItem('haras', JSON.stringify(this.haras) );

        this.router.navigate(['/caballos']);
      } else {

      }
    });
  }

  cargarHarasUI( dato ) {
    if ( localStorage.getItem('haras') !== null ) {
      this.haras = JSON.parse( localStorage.getItem('harasui') );
      $(() => {
        $( '#haras_hrs' ).autocomplete({
            source: this.haras
        });
      });
    } else {
      this._caballosService.cargarHaras()
      .subscribe( haras => {
        $('#act_har').removeClass('fa-spin');
        this.haras = haras;
        localStorage.setItem('harasui', JSON.stringify(haras) );
        $(() => {
          $( '#haras_hrs' ).autocomplete({
              source: haras
          });
        });
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
      $(() => {
        $( '#padre_hrs' ).autocomplete({
            source: this.padrillosui
        });
      });
    } else {
      this._caballosService.cargarPadrillosUI()
      .subscribe( padrillosui => {
        $('#act_pad').removeClass('fa-spin');
        localStorage.setItem('padrillosui', JSON.stringify(padrillosui) );
        $(() => {
          $( '#padre_hrs' ).autocomplete({
              source: padrillosui
          });
        });
      });
    }
  }

  cargarMadrillasUI( dato ) {

    if ( dato === 'borrar') {
      $('#act_mad').addClass(' fa-spin ');
      localStorage.removeItem('madrillasui');
    }

    if ( localStorage.getItem('madrillasui') !== null ) {
      this.madrillasui = JSON.parse( localStorage.getItem('madrillasui') );
      $(() => {
        $( '#madre_hrs' ).autocomplete({
            source: this.madrillasui
        });
      });
    } else {
      this._caballosService.cargarMadrillasUI()
      .subscribe( madrillasui => {
        $('#act_mad').removeClass('fa-spin');
        localStorage.setItem('madrillasui', JSON.stringify(madrillasui) );
        $(() => {
          $( '#madre_hrs' ).autocomplete({
              source: madrillasui
          });
        });
      });
    }
  }
}

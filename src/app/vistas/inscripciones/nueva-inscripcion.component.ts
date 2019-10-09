import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { HttpClient } from '@angular/common/http';
import { Inscripcion } from '../../modelos/inscripcion';
import { Carrera } from '../../modelos/carrera';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-nueva-inscripcion',
  templateUrl: './nueva-inscripcion.component.html',
  styleUrls: ['./nueva-inscripcion.component.css']
})
export class NuevaInscripcionComponent implements OnInit {

  id_carrera: any;

  inscripcion: Inscripcion = new Inscripcion('', '', '', '', '', '', '', '', '', '', '', '', this.id_carrera);
  caballosui: any;
  jinetesui: any;
  entrenadoresui: any;
  studsui: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _caballosService: CaballosService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params
        .subscribe( parametros => {
          this.inscripcion.id_carrera = parametros['id_carrera'];
        });
    this.cargarCaballosUI();
    this.cargarJinetesUI();
    this.cargarEntrenadoresUI();
    this.cargarStudsUI();
  }

  enviarDatos() {
    this.inscripcion.id_caballo = $('#ejemplar_ipt').val();
    this.inscripcion.id_jinete = $('#jinete_ipt').val();
    this.inscripcion.id_entrenador = $('#entrenador_ipt').val();
    this.inscripcion.id_stud = $('#stud1_ipt').val();
    this.inscripcion.id_stud2 = $('#stud2_ipt').val();
    this.inscripcion.numero = $('#nro_ipt').val();
    this.inscripcion.puesto = $('#pto_ipt').val();
    console.log(this.inscripcion);
    this._caballosService.crearInscripcion( this.inscripcion )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.toastr.success('Correcto', 'Inscripción guardada satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/inscripciones']);
      } else {

      }
    });
  }

  cargarCaballosUI() {
    if ( localStorage.getItem('caballosui') !== null ) {
      this.caballosui = JSON.parse( localStorage.getItem('caballosui') );
      $(() => {
        $( '#ejemplar_ipt' ).autocomplete({
            source: this.caballosui
        });
      });
    } else {
      this._caballosService.cargarCaballosUI()
      .subscribe( caballosui => {
        $(() => {
          $( '#ejemplar_ipt' ).autocomplete({
              source: caballosui
          });
        });
      });
    }
  }

  cargarJinetesUI() {
    if ( localStorage.getItem('jinetesui') !== null ) {
      this.jinetesui = JSON.parse( localStorage.getItem('jinetesui') );
      $(() => {
        $( '#jinete_ipt' ).autocomplete({
            source: this.jinetesui
        });
      });
    } else {
      this._caballosService.cargarJinetesUI()
      .subscribe( jinetesui => {
        $(() => {
          $( '#jinete_ipt' ).autocomplete({
              source: jinetesui
          });
        });
      });
    }
  }

  cargarEntrenadoresUI() {
    if ( localStorage.getItem('entrenadoresui') !== null ) {
      this.entrenadoresui = JSON.parse( localStorage.getItem('entrenadoresui') );
      $(() => {
        $( '#entrenador_ipt' ).autocomplete({
            source: this.entrenadoresui
        });
      });
    } else {
      this._caballosService.cargarEntrenadoresUI()
      .subscribe( entrenadoresui => {
        $(() => {
          $( '#entrenador_ipt' ).autocomplete({
              source: entrenadoresui
          });
        });
      });
    }
  }

  cargarStudsUI() {
    if ( localStorage.getItem('studsui') !== null ) {
      this.studsui = JSON.parse( localStorage.getItem('studsui') );
      $(() => {
        $( '#stud1_ipt' ).autocomplete({
            source: this.studsui
        });
        $( '#stud2_ipt' ).autocomplete({
            source: this.studsui
        });
      });
    } else {
      this._caballosService.cargarStudsUI()
      .subscribe( studsui => {
        $(() => {
          $( '#stud1_ipt' ).autocomplete({
              source: studsui
          });
          $( '#stud2_ipt' ).autocomplete({
              source: studsui
          });
        });
      });
    }
  }
}

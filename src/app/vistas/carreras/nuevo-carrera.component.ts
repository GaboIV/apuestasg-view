import { Component, OnInit } from '@angular/core';
import { Hipodromo } from '../../modelos/hipodromo';
import { Router, ActivatedRoute } from '@angular/router';
import { CaballosService } from '../../servicios/caballos.service';
import { Carrera } from '../../modelos/carrera';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevo-carrera',
  templateUrl: './nuevo-carrera.component.html',
  styleUrls: ['./nuevo-carrera.component.css']
})



export class NuevoCarreraComponent implements OnInit {

  carrera: Carrera = new Carrera('', 'LR1000100', '1', '', '1000', '1', '01', '00', '', '', '');

  hipodromos: Hipodromo[] = [];

  hoy: number = Date.now();

  today = new Date(this.hoy);

  acronimo: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _caballoService: CaballosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hipodromos = JSON.parse( localStorage.getItem('hipodromos') );
    this.cargarHipodromos();
    this.query();
    this.calcularFecha();
    $('#nro_gral').focus().select();
  }

  cargarHipodromos() {
    this._caballoService.cargarHipodromos()
          .subscribe( resp => {
            this.hipodromos = resp.hipodromos;
            localStorage.setItem('hipodromos', JSON.stringify(resp.hipodromos) );
          } );
  }

  query ( ) {
    $('.cod_hrs').keyup( () => {
      const acro = $('#hipodromo_car').val();
      let arra: any;
      arra = this.hipodromos.find(hipodromo => hipodromo.id_hipodromo === acro );
      arra = arra.acro;
      const nro_gral = $('#nro_gral').val();
      const nro_carrera = $('#nro_carrera').val();
      const nro_valida = $('#nro_valida').val();
      const codigo = arra + nro_gral + nro_carrera + nro_valida;
      $('#codigo_car').val(codigo);
      this.carrera.codigo = codigo;
      this.calcularFecha();
    });

    $('.hipodromo_car').change( () => {
      const acro = $('#hipodromo_car').val();
      let arra: any;
      arra = this.hipodromos.find(hipodromo => hipodromo.id_hipodromo === acro );
      arra = arra.acro;
      const nro_gral = $('#nro_gral').val();
      const nro_carrera = $('#nro_carrera').val();
      const nro_valida = $('#nro_valida').val();
      const codigo = arra + nro_gral + nro_carrera + nro_valida;
      $('#codigo_car').val(codigo);
      this.calcularFecha();
    });
  }

  calcularFecha() {
    this.acronimo = 
    $('#fechaAnio').val() + '-' + 
    $('#fechaMes').val() + '-' + 
    $('#fechaDia').val() + ' ' + 
    $('#fechaHora').val() + ':' + 
    $('#fechaMinuto').val() + ':00 ' +
    $('#fechaAMP').val();
    this.carrera.fecha_hora = this.acronimo;
  }

  enviarDatos ( carrera: Carrera ) {
    console.log(carrera);
    this._caballoService.crearCarrera( this.carrera )
    .subscribe( res => {
      if (res.status === 'correcto') {
        this.toastr.success('Correcto', 'Carrera guardada satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/carreras']);
      } else {
        
      }
    });
  }

}

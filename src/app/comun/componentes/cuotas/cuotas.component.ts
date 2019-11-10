import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css']
})
export class CuotasComponent implements OnInit {

  tipo: any;

  selecciones = [];
  selecciones2 = [];

  cuota = 1;
  aganar = 0;
  montoapuesta = 0;

  wines = ''; montos: any; public apostado = 0;

  constructor(
    public _inicioSesion: InicioSesionService
  ) { }

  ngOnInit() {
    console.log( "Usuario:" + this._inicioSesion.usuario.nick );
    if ( this._inicioSesion.usuario.nick !== undefined && this._inicioSesion.usuario.nick !== '') {
      this.obtenerSelecciones();
    }
  }

  removerSel( id_sel ) {

    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast ({
      type: 'info',
      title: 'Enviando datos'
    });

    this._inicioSesion.borrarSel( id_sel )
    .subscribe( resp => {

      // tslint:disable-next-line:no-shadowed-variable
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

      if ( resp.status === 'success') {
        this.obtenerSelecciones();
      }
    });
  }

  obtenerSelecciones() {
    this._inicioSesion.obtenerSelecciones()
    .subscribe( resp => {
      if ( resp.selecciones ) {
        if ( resp.tipo === '2x') {
          this.selecciones = [];
          this.selecciones2 = resp.selecciones;
          this.cuota = resp.cuota;
          this.cambioApuesta();
        } else if ( resp.tipo === '27') {
          this.selecciones2 = [];
          this.selecciones = resp.selecciones;
        } else if ( resp.tipo === '') {
          this.selecciones = [];
          this.selecciones2 = [];
        }
      }
    });
  }

  cambioApuesta () {
    this.aganar = this.montoapuesta * this._inicioSesion.cuota;
  }

  apostard() {

    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast ({
      type: 'info',
      title: 'Enviando datos'
    });

    this.query();
    this._inicioSesion.enviarTicketd( this._inicioSesion.montoapuesta )
    .subscribe( resp => {

      // tslint:disable-next-line:no-shadowed-variable
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

      this.cambioApuesta();
    });
  }

  query() {
    const x: any = document.getElementsByClassName('amt');

    const y: any = document.getElementsByClassName('select_horse_win');
    let suma: any = 0;
    let valors = '';
    let wins = '';

    for (let i = 0; i < x.length; i++) {
      if (!isNaN(x[i].value) && x[i].value !== '') {
        suma = parseFloat(suma) + x[i].value;
        valors = valors + '#' + x[i].value;
      } else {
        valors = valors + '#';
      }

      if (!isNaN(y[i].value) && y[i].value !== '') {
        wins = wins + '#' + y[i].value;
      } else {
        wins = wins + '#';
      }
    }
    this.wines = wins;
    this.montos = valors;
    this.apostado = suma;
  }

  apostar() {

    const toast = swal.mixin({
      toast: true,
      position: 'top-end'
    });
    toast ({
      type: 'info',
      title: 'Enviando datos'
    });

    this.query();
    this._inicioSesion.enviarTicket( this.montos )
    .subscribe( resp => {

      // tslint:disable-next-line:no-shadowed-variable
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
    });
  }
}

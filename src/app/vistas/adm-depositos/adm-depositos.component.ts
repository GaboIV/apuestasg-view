import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { Pago } from '../../modelos/pago.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-adm-depositos',
  templateUrl: './adm-depositos.component.html',
  styleUrls: ['./adm-depositos.component.css']
})
export class AdmDepositosComponent implements OnInit {

  pagos: Pago;

  constructor(
    public _generalesService: GeneralesService,
    public _usuariosService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarPagos();
  }

  cargarPagos () {
    this._usuariosService.obtenerpagos(1)
    .subscribe( resp => {
      this.pagos = resp.pays.data;
    });
  }

  cambioStatus (pago: Pago, estatus) {
    this._generalesService.actualizarPago(pago.id, estatus)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        pago.status = estatus;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { Pago } from '../../modelos/pago.modelo';

@Component({
  selector: 'app-adm-depositos',
  templateUrl: './adm-depositos.component.html',
  styleUrls: ['./adm-depositos.component.css']
})
export class AdmDepositosComponent implements OnInit {

  pagos: Pago;

  constructor(
    public _generalesService: GeneralesService
  ) { }

  ngOnInit() {
    this.cargarPagos();
  }

  cargarPagos () {
    this._generalesService.cargarPagos()
    .subscribe( resp => {
      this.pagos = resp;
    });
  }

  cambioStatus (pago: Pago, estatus) {
    this._generalesService.actualizarPago(pago.id_pago, estatus)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        pago.estatus = estatus;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { Pago } from '../../modelos/pago.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Payment } from 'src/app/modelos/payment';
import { PaymentService } from 'src/app/servicios/payment.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-adm-depositos',
  templateUrl: './adm-depositos.component.html',
  styleUrls: ['./adm-depositos.component.css']
})
export class AdmDepositosComponent implements OnInit {

  payments: Payment;
  page = 1;

  constructor(
    public _generalesService: GeneralesService,
    public _paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this._paymentService.get(this.page)
      .subscribe(resp => {
        this.payments = resp.data;
      });
  }

  // changeStatus(payment: Payment, status) {
  //   this._paymentService.changeStatus(payment.id, status)
  //     .subscribe(resp => {
  //       if (resp.status === '1') {
  //         // pago.status = estatus;
  //       }
  //     });
  // }

  changeStatus(payment, newStatus) {
    const swalWithBootstrapButtons = swal.mixin({});
    let statusName = 'Aprobar';

    if (newStatus == '2') {
      statusName = 'Rechazar';
    }

    swalWithBootstrapButtons({
      title: '¿Deseas ' + statusName.toLowerCase() + ' el siguiente pago?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: statusName,
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._paymentService.changeStatus( payment, newStatus )
        .subscribe( resp => {
          this.loadPayments();
          if (resp.status === 'success') {
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

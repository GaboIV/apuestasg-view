import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';
import { Pago } from '../../modelos/pago.modelo';
import { Banco } from '../../modelos/banco.modelo';
import { Cuenta } from '../../modelos/cuenta.modelo';
import { NgForm } from '@angular/forms';
import { GeneralesService } from '../../servicios/generales.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['../opciones/historial/historial.component.css']
})
export class DepositoComponent implements OnInit {

  pago: Pago = new Pago('', '', '', '', '', '', '', '4', '5', null);
  bancos: Banco[] = [];
  cuentas: Cuenta[] = [];

  constructor(
    public router: Router,
    public _inicioSesion: InicioSesionService,
    public _generalesService: GeneralesService,
    public _usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this._generalesService.cargarCuentas()
    .subscribe( resp => {
      this.cuentas = resp;
    });

    this._generalesService.cargarBancos()
    .subscribe( resp => {
      this.bancos = resp;
    });
  }

  guardarPago(f: NgForm) {
    if ( f.invalid ) {
      return;
    }

   const banco_origen = this.bancos.find( x => x.id == f.value.bank_id );
   const banco_destino = this.cuentas.find( x => x.id == f.value.account_id );   

    const swalWithBootstrapButtons = swal.mixin({});

    swalWithBootstrapButtons({
      title: '¿Deseas registar estos datos de su pago?',
      html: 'Banco de origen: ' + banco_origen.name + '<br>Cuenta de destino: ' + banco_destino.name + ' - ' + banco_destino.bank.name + '<br>Cédula de identidad: ' + f.value.document + '<br>Monto: ' + f.value.amount + '<br>Fecha y hora: ' + f.value.register_date + " " + f.value.registro + '<br>Referencia: ' + f.value.reference,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._usuarioService.crearPago( this.pago )
        .subscribe( resp => {
          if ( resp.status === 'correcto') {
            swal ('Abono agregado', 'Su solicitud de abono fue enviado correctamente. Será comprobado y abonado. Se le notificará vía su correo electrónico. Se generó la solicitud: ' + resp.pay.code, 'success');
            this.router.navigate(['/importantes/1']);
          }
        });
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
      }
    });


  }
}

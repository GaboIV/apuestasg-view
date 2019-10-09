import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';
import { Pago } from '../../modelos/pago.modelo';
import { Banco } from '../../modelos/banco.modelo';
import { Cuenta } from '../../modelos/cuenta.modelo';
import { NgForm } from '@angular/forms';
import { GeneralesService } from '../../servicios/generales.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
    this.pago.id_usuario = this._inicioSesion.usuario.id_usuario;

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

    this._generalesService.crearPago( this.pago )
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.toastr.success('Correcto', 'Pago guardado satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/caballos']);
      }
    });
  }
}

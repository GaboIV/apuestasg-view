import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralesService } from '../../servicios/generales.service';
import { Cuenta } from '../../modelos/cuenta.modelo';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css', '../opciones/historial/historial.component.css']
})
export class BancosComponent implements OnInit {

	cuentas: Cuenta[] = [];

  constructor(
    private route: ActivatedRoute,
    public _generalesService: GeneralesService,
    public _inicioSesion: InicioSesionService
  ) { }

  ngOnInit() {
  	this._generalesService.cargarCuentas()
    .subscribe( resp => {
      this.cuentas = resp;
    });
  }

}

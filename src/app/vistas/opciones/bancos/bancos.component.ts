import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Cuenta } from 'src/app/modelos/cuenta.modelo';
import { GeneralesService } from 'src/app/servicios/generales.service';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
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

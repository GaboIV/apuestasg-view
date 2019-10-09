import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css', '../opciones/historial/historial.component.css']
})
export class MiCuentaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public _inicioSesion: InicioSesionService
  ) { }

  ngOnInit() {
  }

}

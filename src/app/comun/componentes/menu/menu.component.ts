import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../../servicios/generales.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public largoVentana: any;
  public largoTabla: any;

  public scrollbarOptions = { theme: 'minimal-dark',  alwaysShowScrollbar: 1 };

  constructor(
    public _generalService: GeneralesService,
    public _inicioSesion: InicioSesionService
  ) { }

  ngOnInit() {
    this.largoVentana = window.innerHeight;
    this.largoTabla = this.largoVentana;
    this.largoTabla += 'px';
  }

}

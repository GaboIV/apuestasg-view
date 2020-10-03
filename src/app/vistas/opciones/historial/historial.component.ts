import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from '../../../servicios/inicio-sesion.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  tickets: any;

  constructor(
    private route: ActivatedRoute,
    public _inicioSesion: InicioSesionService,
  ) { }

  ngOnInit() {
    this.cargarTicketes('todos');
  }

  cargarTicketes( estatus ) {
    this._inicioSesion.cargarTickets( estatus )
    .subscribe( ticketes => {
      this.tickets = ticketes.data;
    } );
  }
}

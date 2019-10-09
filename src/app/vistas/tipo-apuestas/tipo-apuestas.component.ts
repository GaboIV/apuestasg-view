import { Component, OnInit } from '@angular/core';
import { TipoApuesta } from '../../modelos/tipoApuesta';
import { TipoApuestaService } from '../../servicios/tipo-apuesta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipo-apuestas',
  templateUrl: './tipo-apuestas.component.html',
  styleUrls: ['./tipo-apuestas.component.css']
})
export class TipoApuestasComponent implements OnInit {

  tipoApuestas: TipoApuesta[];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _tipoApuestaService: TipoApuestaService,
    public _generalesService: GeneralesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cargarTipoApuesta();
  }

  cargarTipoApuesta() {
    this._tipoApuestaService.cargarTipoApuestas()
          .subscribe( tipoApuestas => this.tipoApuestas = tipoApuestas );
  }

  cambiarEdit() {
    this.mostrarEdit =  true;
  }

  ocultarEdit( tipoApuesta: TipoApuesta ) {
    console.log( tipoApuesta );
    this.mostrarEdit =  false;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['../mensajes.component.css', '../../opciones/historial/historial.component.css']
})
export class MensajeComponent implements OnInit {

	mensajes: any;
	param = '';

	constructor(
		private route: ActivatedRoute,
		public _inicioSesion: InicioSesionService
	) { }

	ngOnInit() {
		this.route.params
	    .subscribe( parametros => {
	      const param = parametros.serialmsj;

	      this.param = param;
	 	});
		this.cargarMensajes( '8888', this.param, this._inicioSesion.usuario.id );
	}

	cargarMensajes( pagina, criterio, id_usuario ) {
    this._inicioSesion.cargarMensajes( pagina, criterio, id_usuario )
    .subscribe(resp => {
	      console.log( resp.mensajes );
	      this.mensajes = resp.mensajes;
	    });
	  }

}

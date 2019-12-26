import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css', '../historial/historial.component.css']
})
export class DepositosComponent implements OnInit {

  pagos = [];
  pagina = 1;
  total = 0;

  constructor(
  	private route: ActivatedRoute,
    public _inicioSesion: InicioSesionService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarPagos(this.pagina);
  }

  cargarPagos (page: number) {
    this._usuarioService.obtenerpagos(page)
    .subscribe( resp => {
      this.pagos = resp.pays.data;
      this.total = resp.pays.total;
      this.pagina = resp.pays.current_page;
    })
  }

}

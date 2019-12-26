import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css', '../historial/historial.component.css']
})
export class TransaccionesComponent implements OnInit {

  transactions = [];
  pagina = 1;
  total = 0;

  constructor(
    private route: ActivatedRoute,
    public _inicioSesion: InicioSesionService,
    public _usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.cargarTransacciones(this.pagina);
  }

  cargarTransacciones (page: number) {
    this._usuarioService.obtenertransacciones(page)
    .subscribe( resp => {
      this.transactions = resp.transactions.data;
      this.total = resp.transactions.total;
      this.pagina = resp.transactions.current_page;
    })
  }

}

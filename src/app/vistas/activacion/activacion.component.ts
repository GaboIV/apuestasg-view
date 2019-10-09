import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';

@Component({
  selector: 'app-activacion',
  templateUrl: './activacion.component.html',
  styleUrls: ['./activacion.component.css']
})
export class ActivacionComponent implements OnInit {

  cod: string;
  activado = false;
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public _sesionUsuario: InicioSesionService
  ) { }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      console.log(params['cod_act']);
      this.cod = params['cod_act'];
    });

    this._usuarioService.activarUsuario( this.cod )
    .subscribe( res => {
        if ( res.status === 'correcto') {
          this.activado = true;
          this._sesionUsuario.estatus = 'Sesion';
          console.log(res.usuario[0]);
          this._sesionUsuario.usuario = res.usuario[0];
          this._sesionUsuario.guardarUsuario(res.usuario[0].id_usuario, res.usuario[0].numerico, res.usuario[0].usuario);
        } else {
          this.mensaje = res.mensaje;
        }
    });
  }

}

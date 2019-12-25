import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from '../../../modelos/usuario';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

	usuario: Usuario;

  constructor(
    private route: ActivatedRoute,
    public _inicioSesion: InicioSesionService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  	this.cargarUsuario();
  }

  cargarUsuario() {
  	this.usuario = this._inicioSesion.usuario;
  }

  enviarDatosPersonal (f: NgForm) {
  	this.cargando();

    this._usuarioService.modificarDatosPersonal(f.value)
    .subscribe(res => {
      if (res.status == 'success') {
        this.success();
      }
      this._inicioSesion.usuario = res.user;
      localStorage.setItem('usuario', JSON.stringify(res.user));
    });  
  }

  enviarDatosUsuario (f: NgForm) {
  	this.cargando();

    this._usuarioService.modificarDatosComplementario(f.value)
    .subscribe(res => {
      if (res.status == 'success') {
        this.success();
      }
      console.log(res);
      this._inicioSesion.usuario = res.user;
      localStorage.setItem('usuario', JSON.stringify(res.user));
    });
  }

  enviarDatosComplemento (f: NgForm) {
    this.cargando();

    this._usuarioService.modificarDatosComplementario(f.value)
    .subscribe(res => {
      if (res.status == 'success') {
        this.success();
      }
      console.log(res);
      this._inicioSesion.usuario = res.user;
      localStorage.setItem('usuario', JSON.stringify(res.user));
    }); 
  }

  cargando () {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    toast({
      type: 'info',
      title: 'Cargando equipos'
    });
  }

  success () {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    toast({
      type: 'success',
      title: 'Se modificaron datos correctamente'
    });
  }
  

}

import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NacionalidadesService, SubMenuService } from '../../servicios/servicios.indice';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../servicios/usuario.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { isDate } from 'util';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  bonus = "ENTRADA_100K_AG";

  usuario: Usuario = new Usuario(
    '',
    '', 
    '',
    1, 
    '',
    {
      id: '',
      document_type: 'V',
      document_number: null,
      name: '',
      lastname: '',
      birthday: '',
      gender: 'M',
      country_id: 231,
      state_id: '',
      city_id: null,
      parish_id: null,
      address: '',
      phone: '',
      treatment: 'Sr.',
      available: '',
      risk: '',
      points: '',
      ip: '',
      browser: '',
      created_at: '',
      updated_at: '',
      language_id: 1,
      timezone: "America/Caracas",
      format_quot: 1
    }, 
    '',
    null
  );
  registro = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    public _usuarioService: UsuarioService,
    private http: HttpClient,
    private toastr: ToastrService,
    public _sesionUsuario: InicioSesionService,
    public _subMenuService: SubMenuService
  ) { }

  ngOnInit() {}

  enviarDatos( form: NgForm ) {
    let mensaje = '';
    let tipo = '';

    form.value.birthday = new Date(form.value.birthday);

    if ( form.value.country_id === 231) {
      if (form.value.treatment === 'Sr.' || form.value.treatment === 'Sra.' || this.usuario.player.treatment === 'Srta.') {
        if (form.value.name.length >= 2) {
          if (form.value.lastname.length >= 2) {
            if (isDate(form.value.birthday)) {
              if (!isNaN(form.value.document_number) && form.value.document_number > 99999) {
                if (form.value.nick.length >= 4) {
                  if (form.value.password.length > 5 && (form.value.password === form.value.password_confirmation)) {
                    if (form.value.code_security.length > 3 && (form.value.code_security === form.value.code_security_confirmation)) {
                      const toast = swal.mixin({
                        toast: true,
                        position: 'center',
                        showConfirmButton: false,
                      });
                      toast ({
                        type: 'info',
                        title: 'Enviando datos'
                      });

                      this._usuarioService.crearUsuario( form.value )
                      .subscribe( res => {

                        swal(
                          res.titulo,
                          res.mstatus,
                          res.status
                        );

                        this._sesionUsuario.obtenerUsuario( form.value.nick, form.value.password, 'contrasena')
                        .subscribe( res => {
                          if (res.access_token) {
                            this._subMenuService.cargarMenu();
                            this._sesionUsuario.estatus = 'Sesion';
                            this._sesionUsuario.usuario = res.user;
                            this._sesionUsuario.guardarUsuario(res.user.id, res.access_token, res.user.nick);
                            this._sesionUsuario.obtenerSelecciones().subscribe();
                          }
                        });

                        this.router.navigate(['/importantes/1']);

                      });
                    } else {
                      mensaje = 'Los números de seguridad escritos no coinciden o son inválidos';
                      tipo = 'error';
                      $('#nro32').select().focus();
                    }
                  } else {
                    mensaje = 'Las contraseñas escritas no coinciden o son inválidos';
                    tipo = 'error';
                    $('#nro31').select().focus();
                  }
                } else {
                  mensaje = 'Nombre de usuario debe ser mayor a 3 caracteres';
                  tipo = 'error';
                  $('#nro30').select().focus();
                }
              } else {
                mensaje = 'Número de cédula inválido';
                tipo = 'error';
                $('#nro67').select().focus();
              }
            } else {
              mensaje = 'Fecha inválida';
              tipo = 'error';
              $('#nro37').select().focus();
            }
          } else {
            mensaje = 'Apellidos(s) deben ser mayor a 3 caracteres';
            tipo = 'error';
            $('#nro4').select().focus();
          }
        } else {
          mensaje = 'Nombre(s) deben ser mayor a 3 caracteres';
          tipo = 'error';
          $('#nro3').select().focus();
        }
      } else {
        mensaje = 'Tipo de tratamiento seleccionado no válido';
        tipo = 'error';
      }
    } else {
      mensaje = 'País seleccionado no válido';
      tipo = 'error';
    }

    if (tipo === 'error') {
      this.toastr.error('Error', mensaje, {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
    }
  }

}

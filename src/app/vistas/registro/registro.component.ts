import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../servicios/usuario.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { isDate } from 'util';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario = new Usuario(
    '', 
    '', 
    null, 
    1, 
    '', 
    {
    id: '',
    document_type: '',
    document_number: null,
    name: '',
    lastname: '',
    birthday: '',
    gender: '',
    country_id: null,
    state_id: '',
    city_id: null,
    parish_id: null,
    address: '',
    phone: '',
    treatment: '',
    available: '',
    risk: '',
    points: '',
    ip: '',
    browser: '',
    created_at: '',
    updated_at: '' 
    }, 
    '', 
    ''
  );
  nacDia = 1;
  nacMes = 1;
  nacAnio = 2018;
  registro = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    public _usuarioService: UsuarioService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.usuario.player.birthday = this.nacAnio + '-' + this.nacMes + '-' + this.nacDia;
  }

  enviarDatos( form: NgForm ) {
    let mensaje = '';
    let tipo = '';

    if ( form.value.country_id === '231') {
      if (form.value.treatment === '1' || form.value.treatment === '2' || this.usuario.player.treatment === '3') {
        if (form.value.name.length >= 3) {
          if (form.value.lastname.length >= 3) {
            if (isDate(form.value.birthday)) {
              if (!isNaN(form.value.document_number) && form.value.document_number > 999999) {
                if (form.value.nick.length >= 3) {
                  if (form.value.password.length > 5 && (form.value.password === form.value.password2)) {
                    if (form.value.numeric.length > 3 && (form.value.numeric === form.value.numeric2)) {
                      const toast = swal.mixin({
                        toast: true,
                        position: 'center',
                        showConfirmButton: false,
                      });
                      toast ({
                        type: 'info',
                        title: 'Enviando datos'
                      });

                      this._usuarioService.crearUsuario( this.usuario )
                      .subscribe( res => {

                        swal(
                          res.titulo,
                          res.mstatus,
                          res.status
                        );

                        this.router.navigate(['/importantes/21']);

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

  ajustarNac(tipo, evento) {
    if ( tipo === 'dia') {
      this.nacDia = evento;
    }

    if ( tipo === 'mes') {
      this.nacMes = evento;
    }

    if ( tipo === 'anio') {
      this.nacAnio = evento;
    }

    

    let fecha = new Date(this.nacAnio + '-' + this.nacMes + '-' + this.nacDia + ' GMT -0500');

    this.nacDia = fecha.getDate();
    this.nacMes = fecha.getMonth() + 1;
    this.nacAnio = fecha.getFullYear();

    if ( isNaN(this.nacDia) ) {
      fecha = new Date('1999-1-1');

      this.nacDia = fecha.getDate();
      this.nacMes = fecha.getMonth() + 1;
      this.nacAnio = fecha.getFullYear();
    }

    this.usuario.player.birthday = fecha.toString();

    
  }

}

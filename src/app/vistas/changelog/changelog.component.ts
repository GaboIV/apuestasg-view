import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from '../../servicios/inicio-sesion.service';
import { GeneralesService } from '../../servicios/generales.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['../opciones/historial/historial.component.css', './changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  changelogs: any;
  zona = 'changelogs';
  nuevaTarea = '';
  nuevoEstatus = '';


  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _inicioSesion: InicioSesionService,
    public _generalesService: GeneralesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this._generalesService.cargarChangelog( 'todos' )
    .subscribe( resp => {
      this.changelogs = resp.changelog;
    });

    this.route.queryParams
    .subscribe(params => {
      this.zona = params.zona;
    });

    if ( this.zona === undefined) {
        this.router.navigate(['/changelog'], { queryParams: { zona: 'tareas' } });
        this.zona = 'tareas';
    }
  }

  enviarTarea () {
    this._generalesService.agregarTarea( this.nuevaTarea, this._inicioSesion.usuario.id_usuario)
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        this.changelogs = resp.changelogs;
          this.toastr.success('Correcto', 'Se agregó la tarea:  ' + this.nuevaTarea , {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          const navigationExtras: NavigationExtras = {
            queryParams: { 'zona': 'tareas' }
          };
          this.router.navigate(['/changelog'], navigationExtras );

          this.toastr.info('<div><input></div>');
      }
    });
  }

  verEstatus ( estatus ) {
    if ( this.nuevoEstatus === estatus) {
      this.nuevoEstatus = '0';
    } else {
      this.nuevoEstatus = estatus;
    }
  }

  cambiarEstatus ( cl ) {
    const id_cl = cl.id_reto;
    this._generalesService.actualizarEstatusTarea( id_cl )
    .subscribe( resp => {
      if ( resp.status === 'correcto') {
        cl.estatus = '1';
        this.nuevoEstatus = '0';
      }
    });
  }

}

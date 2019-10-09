import { Component, OnInit } from '@angular/core';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { Deporte } from '../../modelos/deporte';
import { Router, ActivatedRoute } from '@angular/router';
import { DeportesService } from '../../servicios/deportes.service';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';
import { Liga } from '../../modelos/ligas';
import { LigasService } from '../../servicios/ligas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-liga',
  templateUrl: './agregar-liga.component.html',
  styleUrls: ['./agregar-liga.component.css']
})

export class AgregarLigaComponent implements OnInit {
  liga: Liga = new Liga('', '', '', '', 0, 0, '', '', '', '', 0, '');
  nacionalidades: Nacionalidad[];
  deportes: Deporte[];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _deporteService: DeportesService,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    public _ligasService: LigasService,
    private http: HttpClient,
    private toastr: ToastrService

  ) { }

  ngOnInit() {
    this.cargarNacionalidades();
    this.cargarDeportes();
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
          .subscribe( nacionalidades => this.nacionalidades = nacionalidades );
  }

  cargarDeportes() {
    this._deporteService.cargarDeportes()
          .subscribe( deportes => this.deportes = deportes );
  }

  enviarDatos( liga: Liga ) {
    this._ligasService.crearLiga( liga )
    .subscribe( res => {
      if ( res.status === 'correcto') {
        this.toastr.success('Correcto', 'Liga guardada satisfactoriamente', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/ligas']);
      }
    });
  }

}

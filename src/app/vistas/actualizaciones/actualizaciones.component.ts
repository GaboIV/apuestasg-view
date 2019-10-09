import { Component, OnInit } from '@angular/core';
import { Liga } from '../../modelos/ligas';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { Router, ActivatedRoute } from '@angular/router';
import { LigasService } from '../../servicios/ligas.service';
import { DeportesService } from '../../servicios/deportes.service';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';
import { URL_A_FUNC } from '../../comun/link';

@Component({
  selector: 'app-actualizaciones',
  templateUrl: './actualizaciones.component.html',
  styleUrls: ['./actualizaciones.component.css']
})
export class ActualizacionesComponent implements OnInit {

  actualizaciones: Liga[];
  nacionalidades: Nacionalidad[];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';
  mostrar = 0;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _ligasService: LigasService,
    public _deporteService: DeportesService,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cargarActualizaciones();
    this.cargarNacionalidades();
  }

  cargarActualizaciones() {
    this._ligasService.cargarActualizaciones()
          .subscribe( actualizaciones => this.actualizaciones = actualizaciones );
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
          .subscribe( nacionalidades => this.nacionalidades = nacionalidades );
  }

  cambiarMostrar( act ) {

    if ( this.mostrar === 0) {
      this.mostrar = act.id_liga;
    } else {
      this.mostrar = 0;
    }
  }

  actualizarPartidos( id_liga ) {
    this.ventanaCentrada(URL_A_FUNC + '/encuentros.php?IDE=' + id_liga, '800', '600', 'Popupuno');
  }

  actualizarCuotas( id_liga ) {
    this.ventanaCentrada(URL_A_FUNC + '/cuotas.php?IDE=' + id_liga + '&total_parts=0&actual_part=0', '800', '600', 'Popupuno');
  }

  ventanaCentrada(pagina, w, h, nombre) {
    console.log('abriendo win');
    const winleft = (screen.width - w) / 2;
    const wintop = (screen.height - h) / 2;
    const caracteristicas = 'height=' + h + ',width=' + w + ',top=' + wintop + ',left=' + winleft;
    const win = window.open(pagina, nombre, caracteristicas);
  }
}

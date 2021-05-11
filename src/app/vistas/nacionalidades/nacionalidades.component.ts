import { Component, OnInit } from '@angular/core';
import { Nacionalidad } from '../../modelos/nacionalidad';
import { Router, ActivatedRoute } from '@angular/router';
import { NacionalidadesService } from '../../servicios/servicios.indice';
import { GeneralesService } from '../../servicios/generales.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nacionalidades',
  templateUrl: './nacionalidades.component.html',
  styleUrls: ['./nacionalidades.component.css']
})
export class NacionalidadesComponent implements OnInit {

  nacionalidades: Nacionalidad[];
  resultado: any;
  selectedFile: File;
  mostrarEdit = false;
  pagina = 1;
  desactivar = 'disabled';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _nacionalidadesService: NacionalidadesService,
    public _generalesService: GeneralesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cargarNacionalidades();
  }

  cargarNacionalidades() {
    this._nacionalidadesService.cargarNacionalidades()
    .subscribe( nacionalidades => {
      this.nacionalidades = nacionalidades
      console.log(this.nacionalidades);
    });
  }

  cambiarEdit() {
    this.mostrarEdit =  true;
  }

  ocultarEdit( nacionalidad: Nacionalidad ) {
    this.mostrarEdit =  false;
    this._nacionalidadesService.actualizarNacionalidad( nacionalidad )
            .subscribe( res => {
            });
  }

  subirImagen(event, nacionalidad) {
    this.selectedFile = event.target.files[0];
    this._generalesService.subirImagen( nacionalidad.id_lista_p, this.selectedFile, 'nacionalidades' )
      .subscribe( res => {
        this.resultado = res;
        nacionalidad.img = this.resultado.imagen;
      });
  }

  buscarElemento(valor: string) {
    if ( valor === '') {
      valor = 'todos';
    }
    console.log( valor );
  }

  changeImageLink (pais){
    this._generalesService.modificarDatoPais(pais.id, pais.image_link, 'image_link')
      .subscribe(resp => {
        if (resp.status == 'success') {
          pais.image_link = pais.image_link;
        }
      });
  }

  changeFlagImageLink (pais){
    this._generalesService.modificarDatoPais(pais.id, pais.flag_image_link, 'flag_image_link')
      .subscribe(resp => {
        if (resp.status == 'success') {
          pais.flag_image_link = pais.flag_image_link;
        }
      });
  }
}

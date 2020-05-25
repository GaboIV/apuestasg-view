import { Injectable } from '@angular/core';
import {
  URL_CABALLOS,
  URL_JINETES,
  URL_ENTRENADORES,
  URL_HARAS,
  URL_STUDS,
  URL_HIPODROMOS,
  URL_CARRERAS,
  URL_INSCRIPCION,
  URL_SELECCION, 
  URL_PUBLIC} from '../comun/link';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Caballo } from '../modelos/caballos';
import { Jinete } from '../modelos/jinetes';
import { Entrenador } from '../modelos/entrenadores';
import { Haras } from '../modelos/haras';
import { Studs } from '../modelos/studs';
import { Hipodromo } from '../modelos/hipodromo';
import { Carrera } from '../modelos/carrera';
import { Inscripcion } from '../modelos/inscripcion';
import { InicioSesionService } from './inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class CaballosService {

  carreras: Carrera[] = [];

  act_caballos = JSON.parse( localStorage.getItem('act_caballos') );
  act_jinetes = JSON.parse( localStorage.getItem('act_jinetes') );
  act_entrenadores = JSON.parse( localStorage.getItem('act_entrenadores') );
  act_haras = JSON.parse( localStorage.getItem('act_haras') );
  act_studs = JSON.parse( localStorage.getItem('act_studs') );
  act_hipodromos = JSON.parse( localStorage.getItem('act_hipodromos') );

  st_cab = ''; st_jin = ''; st_ent = ''; st_har = ''; st_stu = '';

  constructor(
    private http: HttpClient,
    public _loginService: InicioSesionService,
  ) { }

  cargarCaballos(page: number, criterio) {
    const url = URL_CABALLOS + "?page=" + page + '&criterio=' + criterio;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        if ( resp.status === 'correcto') {
          this.act_caballos = resp;
        }
        return resp;
      }));
  }

  cargarCaballosUI() {
    const url = URL_CABALLOS + '/caballosui';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.caballosui;
      }));
  }

  cargarPadrillosUI() {
    const url = URL_CABALLOS + '/padrillosui';

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  agregarMadrilla ( nombre, caballo ) {
    const url = URL_CABALLOS + '/madrillas';

    return this.http.post( url, { name: nombre, horse: caballo }, this._loginService.httpOptions )
    .pipe(map( (resp: any) => {
      const res = resp;
      return res;
    }));
  }

  agregarPadrillo ( nombre, caballo ) {
    const url = URL_CABALLOS + '/padrillos';

    return this.http.post( url, { name : nombre, horse : caballo }, this._loginService.httpOptions )
    .pipe(map( (resp: any) => {
      const res = resp;
      return res;
    }));
  }

  cargarMadrillasUI() {
    const url = URL_CABALLOS + '/madrillasui';

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarJinetes(page: number, criterio) {
    const url = URL_JINETES + "?page=" + page + '&criterio=' + criterio;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarEntrenadores(page: number, criterio) {
    const url = URL_ENTRENADORES + "?page=" + page + '&criterio=' + criterio;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }
  
  cargarHaras() {
    const url = URL_CABALLOS + '/haras';

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarStuds(page: number, criterio) {
    const url = URL_STUDS + "?page=" + page + '&criterio=' + criterio;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarStudsUI() {
    const url = URL_CABALLOS + '/studsui';

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp.studsui;
      }));
  }

  cargarHipodromos() {
    const url = URL_HIPODROMOS;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarCarreras(dato: string) {
    const url = URL_PUBLIC + 'careers/' + dato;

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  indexRacecoruseActive() {
    const url = URL_PUBLIC + 'racecourses';

    return this.http.get( url, this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  cargarUnaCarreras(dato: string) {
    const url = URL_CARRERAS + '/ver/' + dato;

    return this.http.get( url )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }

  seleccionCarrera ( nro ) {
    if ( nro !== '') {
      const busqueda = new RegExp(nro, 'i');
      const carrera = this.carreras.filter( carreras => busqueda.test( carreras.id_carrera ) );
      return carrera;
    }
  }

  crearCaballo(caballo: Caballo) {
    const url = URL_CABALLOS + '/crear';

    return this.http.post( url, caballo )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearJinete(jinete: Jinete) {
    const url = URL_JINETES + '/crear';

    return this.http.post( url, jinete )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearEntrenador(entrenador: Entrenador) {
    const url = URL_ENTRENADORES + '/crear';

    return this.http.post( url, entrenador )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearHaras(haras: Haras) {
    const url = URL_HARAS + '/crear';

    return this.http.post( url, haras )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearStuds(stud: Studs) {
    const url = URL_STUDS + '/crear';

    return this.http.post( url, stud )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearHipodromo(hipodromo: Hipodromo) {
    const url = URL_HIPODROMOS + '/crear';

    return this.http.post( url, hipodromo )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  crearCarrera(carrera: Carrera) {
    const url = URL_CARRERAS + '/crear';

    return this.http.post( url, carrera )
    .pipe(map( (resp: any) => {
      const res = resp;
      return res;
    }));
  }

  crearInscripcion(inscripcion: Inscripcion) {
    const url = URL_INSCRIPCION + '/crear';

    return this.http.post( url, inscripcion )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  actualizarCaballo( caballo: Caballo  ) {
    const url = URL_CABALLOS + '/actualizar';

    return this.http.post( url, caballo )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  modificarDatoCaballo(id, value, parameter) {
    const url = URL_CABALLOS + '/' + id;
    
    var key = parameter;
    var obj = {};
    obj[key] = value;

    return this.http.put( url, obj, this._loginService.httpOptions )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  actualizarStud( stud: Studs  ) {
    const url = URL_STUDS + '/actualizar';

    const descripcion = stud.descripcion;
    const id_stud = stud.id_stud;

    return this.http.post( url, { descripcion, id_stud } )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  agregarIns ( numero, id_carrera ) {
    const url = URL_CARRERAS + '/inscribir/' + id_carrera + '/' + numero;
    return this.http.post( url, numero )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  retirarIns ( id_inscripcion ) {
    const url = URL_INSCRIPCION + '/retirar';
    
    return this.http.post( url, { id_inscripcion } )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  eliminarIns ( id_inscripcion ) {
    const url = URL_INSCRIPCION + '/eliminar/' + id_inscripcion;
    return this.http.delete( url )
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  enviarCarrera ( carrera: Carrera ) {
    const url = URL_CARRERAS + '/enviada';
    
    return this.http.post( url, { carrera })
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  changeJacketUrl(id, value) {
    const url = URL_CABALLOS + '/horses/jacket_url/' + id;
    
    return this.http.patch( url, { jacket_url: value }, this._loginService.httpOptions)
      .pipe(map( (resp: any) => {
        const res = resp;
        return res;
      })
    );
  }

  syncCareers(id, date) {
    const url = URL_CABALLOS + '/racecourses/' + id + "/sync/" + date;

    console.log(url);

    return this.http.post( url, [], this._loginService.httpOptions )
      .pipe(map ( (resp: any) => {
        return resp;
      }));
  }
}

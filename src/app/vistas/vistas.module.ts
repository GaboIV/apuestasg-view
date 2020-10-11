import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LigasComponent } from './ligas/ligas.component';
import { APP_ROUTES } from '../app.routes';
import { PipesModule } from '../pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NacionalidadesComponent } from './nacionalidades/nacionalidades.component';
import { TipoApuestasComponent } from './tipo-apuestas/tipo-apuestas.component';
import { ActualizacionesComponent } from './actualizaciones/actualizaciones.component';
import { PartidosComponent } from './partidos/partidos.component';
import { AgregarLigaComponent } from './agregar-liga/agregar-liga.component';
import { RegistroComponent } from './registro/registro.component';
import { ActivacionComponent } from './activacion/activacion.component';
import { CaballosComponent } from './caballos/caballos.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { JinetesComponent } from './jinetes/jinetes.component';
import { EntrenadoresComponent } from './entrenadores/entrenadores.component';
import { HarasComponent } from './haras/haras.component';
import { StudsComponent } from './studs/studs.component';
import { HipodromosComponent } from './hipodromos/hipodromos.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { NuevoCaballoComponent } from './caballos/nuevo-caballo.component';
import { NuevoJineteComponent } from './jinetes/nuevo-jinete.component';
import { NuevoEntrenadorComponent } from './entrenadores/nuevo-entrenador.component';
import { AgregarHarasComponent } from './haras/agregar-haras.component';
import { NuevoStudComponent } from './studs/nuevo-stud.component';
import { NuevoCarreraComponent } from './carreras/nuevo-carrera.component';
import { NuevaInscripcionComponent } from './inscripciones/nueva-inscripcion.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { PartidoComponent } from './partidos/partido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { MenuCaballosComponent } from '../comun/componentes/menu-caballos/menu-caballos.component';
import { CarreraComponent } from './carreras/carrera.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { VerCarreraComponent } from './carreras/ver-carrera.component';
import { CuotasComponent } from '../comun/componentes/cuotas/cuotas.component';
import { VerPartidoComponent } from './partidos/ver-partido.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { OpcionesModule } from './opciones/opciones.module';
import { MomentModule } from 'ngx-moment';
import { MenuChangelogComponent } from '../comun/componentes/menu-changelog/menu-changelog.component';
import { ModalContentDirective } from '../directivas/modal.directive';
import { OverlayComponent } from '../comun/componentes/overlay/overlay.component';
import { SamplemodalComponent } from '../modales/samplemodal/samplemodal.component';
import { CompetitorsResultModalComponent } from '../modales/competitors-result-modal/competitors-result-modal.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    PipesModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MalihuScrollbarModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxPaginationModule,
    OpcionesModule,
    MomentModule
  ],
  declarations: [
    NacionalidadesComponent,
    TipoApuestasComponent,
    ActualizacionesComponent,
    PartidosComponent,
    AgregarLigaComponent,
    RegistroComponent,
    ActivacionComponent,
    CaballosComponent,
    JinetesComponent,
    EntrenadoresComponent,
    HarasComponent,
    StudsComponent,
    HipodromosComponent,
    CarrerasComponent,
    InscripcionesComponent,
    NuevoCaballoComponent,
    NuevoJineteComponent,
    NuevoEntrenadorComponent,
    AgregarHarasComponent,
    NuevoStudComponent,
    NuevoCarreraComponent,
    NuevaInscripcionComponent,
    ResultadosComponent,
    PartidoComponent,
    UsuariosComponent,
    NoticiasComponent,
    EstadisticasComponent,
    ChangelogComponent,
    MenuCaballosComponent,
    MenuChangelogComponent,
    CarreraComponent,
    VerCarreraComponent,
    CuotasComponent,
    VerPartidoComponent,
    ModalContentDirective,
    OverlayComponent,
    SamplemodalComponent,
  ],
  exports: [MenuCaballosComponent, MenuChangelogComponent, CuotasComponent, MomentModule],
  entryComponents: [
    OverlayComponent,
    SamplemodalComponent,
    CompetitorsResultModalComponent
  ]
})
export class VistasModule { }

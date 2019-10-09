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
import { HistorialComponent } from './opciones/historial/historial.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { DepositoComponent } from './deposito/deposito.component';
import { BancosComponent } from './bancos/bancos.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PartidoComponent } from './partidos/partido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AdmDepositosComponent } from './adm-depositos/adm-depositos.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { MenuCaballosComponent } from '../comun/componentes/menu-caballos/menu-caballos.component';
import { CarreraComponent } from './carreras/carrera.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { VerCarreraComponent } from './carreras/ver-carrera.component';
import { CuotasComponent } from '../comun/componentes/cuotas/cuotas.component';
import { VerPartidoComponent } from './partidos/ver-partido.component';
import { MensajeComponent } from './mensajes/mensaje/mensaje.component';

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
    SweetAlert2Module.forRoot()
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
    HistorialComponent,
    ResultadosComponent,
    DepositoComponent,
    BancosComponent,
    MiCuentaComponent,
    PromocionesComponent,
    MensajesComponent,
    PartidoComponent,
    UsuariosComponent,
    NoticiasComponent,
    EstadisticasComponent,
    AdmDepositosComponent,
    ChangelogComponent,
    MenuCaballosComponent,
    CarreraComponent,
    VerCarreraComponent,
    CuotasComponent,
    VerPartidoComponent,
    MensajeComponent
  ],
  exports: [MenuCaballosComponent, CuotasComponent]
})
export class VistasModule { }

import { RouterModule, Routes } from '@angular/router';
import { ImportantesComponent } from './vistas/importantes/importantes.component';
import { EquiposComponent } from './vistas/equipos/equipos.component';
import { NoencontradoComponent } from './vistas/noencontrado/noencontrado.component';
import { LigasComponent } from './vistas/ligas/ligas.component';
import { NacionalidadesComponent } from './vistas/nacionalidades/nacionalidades.component';
import { TipoApuestasComponent } from './vistas/tipo-apuestas/tipo-apuestas.component';
import { ActualizacionesComponent } from './vistas/actualizaciones/actualizaciones.component';
import { PartidosComponent } from './vistas/partidos/partidos.component';
import { AgregarLigaComponent } from './vistas/agregar-liga/agregar-liga.component';
import { RegistroComponent } from './vistas/registro/registro.component';
import { ActivacionComponent } from './vistas/activacion/activacion.component';
import { CaballosComponent } from './vistas/caballos/caballos.component';
import { JinetesComponent } from './vistas/jinetes/jinetes.component';
import { EntrenadoresComponent } from './vistas/entrenadores/entrenadores.component';
import { HarasComponent } from './vistas/haras/haras.component';
import { StudsComponent } from './vistas/studs/studs.component';
import { HipodromosComponent } from './vistas/hipodromos/hipodromos.component';
import { CarrerasComponent } from './vistas/carreras/carreras.component';
import { InscripcionesComponent } from './vistas/inscripciones/inscripciones.component';
import { NuevoCaballoComponent } from './vistas/caballos/nuevo-caballo.component';
import { NuevoJineteComponent } from './vistas/jinetes/nuevo-jinete.component';
import { NuevoEntrenadorComponent } from './vistas/entrenadores/nuevo-entrenador.component';
import { AgregarHarasComponent } from './vistas/haras/agregar-haras.component';
import { NuevoStudComponent } from './vistas/studs/nuevo-stud.component';
import { NuevoCarreraComponent } from './vistas/carreras/nuevo-carrera.component';
import { NuevaInscripcionComponent } from './vistas/inscripciones/nueva-inscripcion.component';
import { HistorialComponent } from './vistas/opciones/historial/historial.component';
import { ResultadosComponent } from './vistas/resultados/resultados.component';
import { PartidoComponent } from './vistas/partidos/partido.component';
import { AdminGuardGuard } from './guardias/admin-guard.guard';
import { UsuariosComponent } from './vistas/usuarios/usuarios.component';
import { NoticiasComponent } from './vistas/noticias/noticias.component';
import { EstadisticasComponent } from './vistas/estadisticas/estadisticas.component';
import { ChangelogComponent } from './vistas/changelog/changelog.component';
import { AgregarPartidoComponent } from './vistas/partidos/agregar-partido.component';
import { CarreraComponent } from './vistas/carreras/carrera.component';
import { VerCarreraComponent } from './vistas/carreras/ver-carrera.component';
import { VerPartidoComponent } from './vistas/partidos/ver-partido.component';
import { BancosComponent } from './vistas/opciones/bancos/bancos.component';
import { DepositoComponent } from './vistas/opciones/deposito/deposito.component';
import { AdmDepositosComponent } from './vistas/adm-depositos/adm-depositos.component';
import { MiCuentaComponent } from './vistas/opciones/mi-cuenta/mi-cuenta.component';
import { PromocionesComponent } from './vistas/opciones/promociones/promociones.component';
import { MensajesComponent } from './vistas/opciones/mensajes/mensajes.component';
import { MensajeComponent } from './vistas/opciones/mensajes/mensaje/mensaje.component';
import { DepositosComponent } from './vistas/opciones/deposito/depositos.component';
import { TransaccionesComponent } from './vistas/opciones/transacciones/transacciones.component';
const appRoutes: Routes = [
  { path: 'importantes/:id_categoria', component: ImportantesComponent },
  { path: 'equipos', component: EquiposComponent, canActivate: [AdminGuardGuard] },
  { path: 'caballos', component: CaballosComponent, canActivate: [AdminGuardGuard] },
  { path: 'resultados', component: ResultadosComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevoCaballo', component: NuevoCaballoComponent, canActivate: [AdminGuardGuard] },
  { path: 'jinetes', component: JinetesComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevoJinete', component: NuevoJineteComponent, canActivate: [AdminGuardGuard] },
  { path: 'entrenadores', component: EntrenadoresComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevoEntrenador', component: NuevoEntrenadorComponent, canActivate: [AdminGuardGuard] },
  { path: 'haras', component: HarasComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevoHaras', component: AgregarHarasComponent, canActivate: [AdminGuardGuard]},
  { path: 'studs', component: StudsComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevoStud', component: NuevoStudComponent, canActivate: [AdminGuardGuard]},
  { path: 'hipodromos', component: HipodromosComponent, canActivate: [AdminGuardGuard] },
  { path: 'carreras', component: CarrerasComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevaCarrera', component: NuevoCarreraComponent, canActivate: [AdminGuardGuard]},
  { path: 'inscripciones', component: InscripcionesComponent, canActivate: [AdminGuardGuard] },
  { path: 'nuevaInscripcion/:id_carrera', component: NuevaInscripcionComponent, canActivate: [AdminGuardGuard]},
  { path: 'ligas', component: LigasComponent, canActivate: [AdminGuardGuard] },
  { path: 'agregarLiga', component: AgregarLigaComponent, canActivate: [AdminGuardGuard] },
  { path: 'agregarPartido', component: AgregarPartidoComponent, canActivate: [AdminGuardGuard] },
  { path: 'nacionalidades', component: NacionalidadesComponent, canActivate: [AdminGuardGuard] },
  { path: 'tipoApuestas', component: TipoApuestasComponent, canActivate: [AdminGuardGuard]},
  { path: 'actualizaciones', component: ActualizacionesComponent, canActivate: [AdminGuardGuard]},
  { path: 'partidos', component: PartidosComponent, canActivate: [AdminGuardGuard]},
  { path: 'registro', component: RegistroComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'depositos', component: DepositosComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'mensajes', component: MensajesComponent },
  { path: 'activacion/:cod_act', component: ActivacionComponent },
  { path: 'deposito', component: DepositoComponent },
  { path: 'bancos', component: BancosComponent },
  { path: 'mi-cuenta', component: MiCuentaComponent },
  { path: 'promociones', component: PromocionesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'adm-depositos', component: AdmDepositosComponent },
  { path: 'changelog', component: ChangelogComponent, canActivate: [AdminGuardGuard]},
  { path: 'partido/:id_partido', component: PartidoComponent, canActivate: [AdminGuardGuard] },
  { path: 'carrera/:id_carrera', component: CarreraComponent, canActivate: [AdminGuardGuard] },
  { path: 'verCarrera/:id_carrera', component: VerCarreraComponent },
  { path: 'verPartido/:id_partido', component: VerPartidoComponent },
  { path: 'mensaje/:serialmsj', component: MensajeComponent },
  { path: '',
  redirectTo: '/importantes/1',
  pathMatch: 'full' },
  { path: '**', component: NoencontradoComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );

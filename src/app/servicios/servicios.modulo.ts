import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import {
    EquiposService,
    NacionalidadesService
} from './servicios.indice';
import { LigasService } from './ligas.service';
import { DeportesService } from './deportes.service';
import { GeneralesService } from './generales.service';
import { TipoApuestaService } from './tipo-apuesta.service';
import { UsuarioService } from './usuario.service';
import { CaballosService } from './caballos.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    EquiposService,
    LigasService,
    NacionalidadesService,
    DeportesService,
    TipoApuestaService,
    GeneralesService,
    UsuarioService,
    CaballosService
  ],
  declarations: []
})
export class ServiciosModulo { }

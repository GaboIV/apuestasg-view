import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComponent } from './historial/historial.component';
import { MenuOpcionesComponent } from './menu-opciones/menu-opciones.component';
import { APP_ROUTES } from 'src/app/app.routes';
import { BancosComponent } from './bancos/bancos.component';
import { DepositoComponent } from './deposito/deposito.component';
import { AdmDepositosComponent } from '../adm-depositos/adm-depositos.component';
import { FormsModule } from '@angular/forms';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { MensajeComponent } from './mensajes/mensaje/mensaje.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { OPCIONES_ROUTES } from './opciones.routes';
import { DepositosComponent } from './deposito/depositos.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    APP_ROUTES,
    FormsModule,
    PipesModule,
    OPCIONES_ROUTES,
    NgxPaginationModule
  ],
  declarations: [
    HistorialComponent,
    MenuOpcionesComponent,
    BancosComponent,
    DepositoComponent,
    AdmDepositosComponent,
    MiCuentaComponent,
    PromocionesComponent,
    MensajeComponent,
    MensajesComponent,
    DepositosComponent,
    TransaccionesComponent
  ],
  exports: [
    HistorialComponent,
    DepositoComponent,
    AdmDepositosComponent
  ]
})
export class OpcionesModule { }

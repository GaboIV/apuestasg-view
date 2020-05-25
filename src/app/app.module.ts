import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { ComponentesModule } from './comun/componentes/componentes.module';
import { TituloComponent } from './comun/componentes/cabecera/titulo.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { ImportantesComponent } from './vistas/importantes/importantes.component';
import { EquiposComponent } from './vistas/equipos/equipos.component';
import { NoencontradoComponent } from './vistas/noencontrado/noencontrado.component';
import { APP_ROUTES } from './app.routes';
import { ServiciosModulo } from './servicios/servicios.modulo';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from './pipes/pipes.module';
import { VistasModule } from './vistas/vistas.module';
import { MenuComponent } from './comun/componentes/menu/menu.component';
import { LigasComponent } from './vistas/ligas/ligas.component';
import { ToastrModule } from 'ngx-toastr';
import { AgregarPartidoComponent } from './vistas/partidos/agregar-partido.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HttpErrorInterceptor } from 'src/app/interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    PrincipalComponent,
    ImportantesComponent,
    EquiposComponent,
    NoencontradoComponent,
    MenuComponent,
    LigasComponent,
    AgregarPartidoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    ComponentesModule,
    APP_ROUTES,
    ServiciosModulo,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PipesModule,
    VistasModule,
    MalihuScrollbarModule.forRoot(),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [PrincipalComponent]
})
export class AppModule { }

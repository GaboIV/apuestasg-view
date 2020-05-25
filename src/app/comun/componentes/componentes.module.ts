import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { MenuComponent } from './menu/menu.component';

import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';
import { PieComponent } from './pie/pie.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
    ],
  declarations: [CabeceraComponent, SubMenuComponent, PieComponent],
  exports: [CabeceraComponent, SubMenuComponent, PieComponent]
})
export class ComponentesModule { }

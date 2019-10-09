import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { MenuComponent } from './menu/menu.component';

import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
    ],
  declarations: [CabeceraComponent, SubMenuComponent],
  exports: [CabeceraComponent, SubMenuComponent]
})
export class ComponentesModule { }

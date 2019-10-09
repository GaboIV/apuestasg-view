import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { CuotaPipe } from './cuota.pipe';
import { MontosPipe } from './montos.pipe';
import { ImportantesPipe } from './importantes.pipe';


@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    CuotaPipe,
    MontosPipe,
    ImportantesPipe
  ],
  exports: [
    ImagenPipe,
    MontosPipe,
    ImportantesPipe,
    CuotaPipe
  ]
})
export class PipesModule { }

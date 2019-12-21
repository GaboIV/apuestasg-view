import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGEN } from '../comun/link';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string): any {
    let url = URL_IMAGEN + '';

    if ( !img ) {
      return url + '/teams/xxx';
    }

    switch ( tipo ) {
      case 'equipo':
         url += '/teams/' + img;
      break;

      case 'liga':
       url += '/leagues/' + img;
      break;

      case 'nacionalidad':
       url += '/countries/' + img;
      break;

      case 'usuario':
       url += '/usuarios/' + img;
      break;

      case 'partido':
       url += '/games/' + img;
      break;

      case 'categoria':
       url += '/categorias/' + img;
      break;

      case 'stud':
       url += '/studs/' + img;
      break;

      case 'cuenta':
       url += '/accounts/' + img;
      break;

      default:
       console.log('Tipo de imagen no válido');
       url += '/equipo/xxx';
    }

    return url;
  }

}

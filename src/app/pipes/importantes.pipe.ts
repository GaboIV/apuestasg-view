import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'importantes'
})
export class ImportantesPipe implements PipeTransform {

  transform(categoria: any, nombre?: any): any {

    let clase;

    switch ( categoria ) {
      case '21':
          if ( nombre === 'X') {
            clase = 'ep_cl_name ep_empate';
          } else {
            clase = 'ep_cl_name';
          }
      break;

      case '22':
        if ( nombre === 'X') {
          clase = 'ep_cl_name ep_empate';
        } else {
          clase = 'ep_cl_name';
        }
      break;

      default:
      clase = 'ep_cl_name';
    }

    return clase;
  }

}

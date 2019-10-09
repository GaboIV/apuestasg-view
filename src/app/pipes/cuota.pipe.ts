import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuota'
})
export class CuotaPipe implements PipeTransform {

  transform(valor: any, tipo: any): any {
    if ( !valor ) {
      valor = '0.00';
    }

    switch ( tipo ) {
      case 'americano':
          valor = valor;
      break;

      case 'decimal':
          const datos = valor.split('/');
          let res;

          if ( datos[1] ) {
            res = (datos[0] / datos[1]) + 1 ;
          } else {
            res = (datos[0] * 1) + 1;
          }

          const res2 = res.toFixed(2);

         valor = res2;
      break;

      case 'europeo':
          valor = valor;
      break;

      case 'asiatico':
        valor = valor;
      break;

      default:
      valor = valor;
    }

    return valor;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'montos'
})
export class MontosPipe implements PipeTransform {

  transform(valor: any, tipo: any): any {
    if ( !valor ) {
      valor = '0.00';
    }

    switch ( tipo ) {
      case 'normal':
          valor = valor;
      break;

      case 'decimal':
        let resultado = '';
        let nuevon;
        let j;
        let i;

        if ( valor[0] === '-' ) {
            // Cogemos el numero eliminando los posibles puntos que tenga, y sin
            // el signo negativo
            nuevon = valor.replace(/\./g, '').substring(1);
        } else {
            // Cogemos el numero eliminando los posibles puntos que tenga
             nuevon = valor.replace(/\./g, '');
        }

        // Si tiene decimales, se los quitamos al numero
        if ( valor.indexOf(',') >= 0 ) {
          nuevon = nuevon.substring(0, nuevon.indexOf(','));
        }

        // Ponemos un punto cada 3 caracteres
        for ( i = nuevon.length - 1, j = 0; i >= 0; i--, j++) {
          resultado = nuevon.charAt(i) + ((j > 0) && (j % 3 === 0) ? '.' : '') + resultado;
        }

        // Si tiene decimales, se lo añadimos al numero una vez forateado con
        // los separadores de miles
        if (valor.indexOf(',') >= 0) {
          resultado += valor.substring( valor.indexOf(',') );
        } else {
          resultado += ',00';
        }

        if ( valor[0] === '-') {
            // Devolvemos el valor añadiendo al inicio el signo negativo
            valor = '-' + resultado;
        } else {
            valor = resultado;
        }
      break;

      default:
      valor = valor;
    }

    return valor;
  }

}

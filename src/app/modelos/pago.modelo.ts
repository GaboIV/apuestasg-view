
export class Pago {
    constructor(
        public monto: string,
        public cedula: string,
        public fecha_realizada: string,
        public referencia: string,
        public registro: any,
        public estatus: string,
        public id_usuario: any,
        public banco_id: any,
        public cuenta_id?: any,
        public id_pago?: number
    ) {

    }
}

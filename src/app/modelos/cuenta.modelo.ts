
export class Cuenta {
    constructor(
        public nombre: string,
        public numero: string,
        public documento: string,
        public tipo_cuenta_id?: any,
        public banco_id?: any,
        public correo?: string,
        public id_cuenta?: number
    ) {

    }
}


export class Pago {
    constructor(
        public amount: string,
        public document: string,
        public register_date: string,
        public reference: string,
        public registro: any,
        public status: string,
        public player_id: any,
        public bank_id: any,
        public account_id?: any,
        public id?: number
    ) {

    }
}

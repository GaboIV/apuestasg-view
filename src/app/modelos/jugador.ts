export class Jugador {

    constructor(
        public id?: string,
        public document_type?: string,
        public document_number?: number,
        public name?: string,
        public lastname?: string,
        public birthday?: string,
        public gender?: string,
        public country_id?: any,
        public state_id?: string,
        public city_id?: any,
        public parish_id?: any,
        public address?: string,
        public phone?: string,
        public treatment?: string,
        public available?: string,
        public risk?: string,
        public points?: string,
        public ip?: string,
        public browser?: string,
        public created_at?: string,
        public updated_at?: string,
        public language_id?: number,
        public timezone?: string,
        public format_quot?: number
    ) { }
}

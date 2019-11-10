import { Jugador } from "./jugador";

export class Usuario {

    constructor(
        public id?: string,
        public nick?: string,
        public email?: number,
        public status?: number,
        public attemps?: string,
        public player?: Jugador,
        public password?: string,
        public created_at?: string,
        public updated_at?: string
    ) { }
}

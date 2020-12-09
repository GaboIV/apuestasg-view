import { Player } from "./player";

export class Usuario {

    constructor(
        public id?: string,
        public nick?: string,
        public email?: string,
        public status?: number,
        public attemps?: string,
        public player?: Player,
        public password?: string,
        public code_security?: number,
        public created_at?: string,
        public updated_at?: string
    ) { }
}

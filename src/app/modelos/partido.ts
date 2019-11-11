export class Partido {
    constructor(
        public id?: string,
        public id_web?: string,
        public league_id?: string,
        public start?: Date,
        public avaible?: Date,
        public url?: string,
        public guide?: string,
        public outstanding?: boolean,
        public importance?: number,
        public live_id?: boolean,
        public status_live_id?: boolean,
        public created_at?: Date,
        public updated_at?: Date,
    ) { }
}
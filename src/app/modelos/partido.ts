export class Partido {

    constructor(
        public id_partido?: string,
        public id_wihi_partido?: string,
        public id_liga?: string,
        public fecha_inicio?: Date,
        public disponibilidad?: Date,
        public url?: string,
        public guia?: string,
        public id_wihi_liga?: any,
        public nombre_liga?: string,
        public id_pais?: string,
        public id_categoria?: any,
        public importancia?: string,
        public descripcion?: any,
        public actualizacion?: string,
        public img?: string,
        public equipos?: any,
        public destacado?: string,
        public live_id?: string,
        public status_lid?: string,
        public titulo?: string,
        public eventos?: any
    ) { }
}

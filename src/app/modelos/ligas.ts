export class Liga {

    constructor(
        public nombre_liga?: string,
        public descripcion?: string,
        public actualizacion?: string,
        public url?: string,
        public importancia?: number,
        public id_categoria?: number,
        public id_pais?: string,
        public id_wihi_liga?: string,
        public id_liga?: string,
        public img?: string,
        public equipos?: number,
        public titulo?: string
    ) { }
}

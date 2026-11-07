import { Pais } from "./pais.model";

export class Lead {
    constructor(
        public _id: string,
        public nombreDueno: string,
        public email: string,
        public telefono: string,
        public nombreLocal: string,
        public slugDeseado: string,
         public pais: Pais,
        public categoriaTexto: string,
        public status: 'pendiente' | 'aprobado' | 'rechazado',
        public createdAt: Date,
        public updatedAt: Date,

    ) { }
}

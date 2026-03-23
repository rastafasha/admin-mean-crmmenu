import { Category } from "./category";
import { Pais } from "./pais.model";
import { User } from "./user";

export class Cliente {
    _id: string;
    name: string;
    url: string;
    rrss: string;
    ubicacion: string;
    category: Category;
    pais: Pais;
    dateTest: string;
    dateInicio: string;
    status: boolean;
    partners: User;

}

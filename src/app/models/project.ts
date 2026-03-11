import { Category } from "./category";
import { Pais } from "./pais.model";
import { User } from "./user";

export class Project {
    _id: string;
    name: string;
    url: string;
    type: ProjectType;
    rrss: string;
    ubicacion: string;
    category: Category;
    pais: Pais;
    notificado: boolean;
    hasVisited: boolean;
    dateVisita: string;
    status: boolean;
    tipoMenu: string;
    hasMenu: boolean;
    partners: User;

}

export class ProjectType {
    _id: string;
    name: string;
}
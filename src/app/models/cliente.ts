import { environment } from "src/environments/environment";
import { Category } from "./category";
import { Pais } from "./pais.model";
import { User } from "./user";
const base_url = environment.mediaUrlRemoto;
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
    img: string;
     get imagenUrl(){

      if(!this.img){
        return `assets/img/no-image.jpg`;
      } else if(this.img.includes('https')){
        return this.img;
      } else if(this.img){
        return `${base_url}/pagos/${this.img}`;
      }else {
        return `${base_url}/pagos/no-image.jpg`;
      }

    }

}

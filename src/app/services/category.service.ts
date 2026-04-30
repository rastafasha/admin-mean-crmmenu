import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoria: Category;
  public categoriaslista: Category;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  getCategories() {
    const url = `${baseUrl}/categorias`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, categorias: Category}) => resp.categorias)
      )
  }


  getCategory(_id: string) {
    const url = `${baseUrl}/categorias/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, categoria: Category}) => resp.categoria)
        );
  }


  createCategory(categoria: Category) {
    const url = `${baseUrl}/categorias/crear`;
    return this.http.post(url, categoria, this.headers);
  }

  updateCategory(categoria:Category) {
    const url = `${baseUrl}/categorias/editar/${categoria._id}`;
    return this.http.put(url, categoria, this.headers);
  }

  deleteCategory(_id: string) {
    const url = `${baseUrl}/categorias/borrar/${_id}`;
    return this.http.delete(url, this.headers);
  }

  findByName(categoria: Category) {
    const url = `${baseUrl}/categorias/category_by_nombre/${categoria.nombre}`;
    return this.http.get(url, this.headers);
  }
}

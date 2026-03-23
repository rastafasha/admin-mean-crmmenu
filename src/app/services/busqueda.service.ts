import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Project } from '../models/project';
import { ProjectType } from '../models/project';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private trasnformarUsuarios(resultados: any[]): User[] {
    return resultados.map(
      (user) =>
        new User(
          user.username,
          user.email,
          user.img,
          user.google,
          user.role,
          user.uid,
          user.profile,
        )
    );
  }

  
  private trasnformarCategorias(resultados: any[]): ProjectType[] {
    return resultados;
  }
  private trasnformarProjects(resultados: any[]): Project[] {
    return resultados;
  }
  

  buscar(tipo: 'usuarios' | 'projecttypes' | 'projects'| 'clientes', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.trasnformarUsuarios(resp.resultados);

          case 'projecttypes':
            return this.trasnformarProjects(resp.resultados);
          case 'projects':
            return this.trasnformarCategorias(resp.resultados);
          case 'clientes':
            return this.trasnformarCategorias(resp.resultados);

          default:
            return [];
        }
      })
    );
  }

  searchGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers);
  }
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Project } from '../models/project';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public project: Project;
  public user: User;

  private filteredProjectsSubject = new BehaviorSubject<Project[]>([]);
  public filteredProjects$: Observable<Project[]> = this.filteredProjectsSubject.asObservable();

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getProjects() {
    const url = `${baseUrl}/projects/`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, projects: Project[] }) => resp.projects)
      )
  }

  getProject(_id: string) {
    const url = `${baseUrl}/projects/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, project: Project }) => resp.project)
      );
  }

  getByUser(usuario: any) {
    const url = `${baseUrl}/projects/user/${usuario}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, projects: Project[] }) => resp.projects)
      )
  }

  createProject(project: Project) {
    const url = `${baseUrl}/projects/store`;
    return this.http.post(url, project, this.headers);
  }

  updateProject(project: Project) {
    const url = `${baseUrl}/projects/update/${project._id}`;
    return this.http.put(url, project, this.headers);
  }

  updateProjectStatus(project: Project) {
    const url = `${baseUrl}/projects/updatestatus/${project._id}`;
    return this.http.put(url, project, this.headers);
  }

  deleteProject(_id: string) {
    const url = `${baseUrl}/projects/delete/${_id}`;
    return this.http.delete(url, this.headers);
  }

  emitFilteredProjects(projects: Project[]) {
    this.filteredProjectsSubject.next(projects);
  }
}

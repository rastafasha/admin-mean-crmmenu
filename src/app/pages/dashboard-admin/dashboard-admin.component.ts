import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.css'],
    standalone: false
})
export class DashboardAdminComponent implements OnInit {
  @Input() projects: Project[] = [];

  title = 'Panel Administrativo';
  public user: any;
  public profile: User;
  displaycomponent: string = 'none';
  limit = 3;

  error: string;
  uid:string;

  categorias: Category;
  usuarios: User;
  usuario: User;
  query:string ='';
  selectedProject:Project;
  projectSeleccionado:Project;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private projectService: ProjectService,
    

  ) {
    this.user = authService.getLocalStorage();
  }

  ngOnInit(): void {

    window.scrollTo(0,0);
    this.authService.closeMenu();
    this.uid = this.user.uid;
    this.getProjectsData();
    this.subscribeToFilteredProjects();
  }

  getProjectsData(){
    this.projectService.getProjects().subscribe((resp:any)=>{
      this.projects = resp;
    })
  }

  onEditProject(project: Project) {
    this.selectedProject = project;
  }
  onDeleteProject(project: Project) {
    this.selectedProject = project;
  }

  subscribeToFilteredProjects() {
    this.projectService.filteredProjects$.subscribe((filteredProjects: Project[]) => {
      if (filteredProjects && filteredProjects.length > 0) {
        this.projects = filteredProjects;
      } else {
        this.getProjectsData();
      }
    });
  }


  openEditModal(): void {
    this.selectedProject = null;
  }

  onCloseModal(): void {
    this.projectSeleccionado = null;
  }

  PageSize() {
    this.getProjectsData();

  }
  
}

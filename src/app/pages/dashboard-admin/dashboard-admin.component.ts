import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  @Input() projects: Project[] = [];

  title = 'Panel Administrativo';
  public user: User;
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
    private projectService: ProjectService,
    

  ) {
    this.user = userService.usuario;
  }

  ngOnInit(): void {

    this.closeMenu();
    this.getUser();
    this.getProjectsData();
    this.subscribeToFilteredProjects();
    window.scrollTo(0,0);
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

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
  }

  getUserRemoto(id:string){
    id  = this.user.uid
    this.userService.getUserById(id).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error;
      }
    );
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionesComponent } from './conf/configuraciones/configuraciones.component';
import { RolesViewComponent } from './conf/roles/roles-view/roles-view.component';
import { ContactComponent } from './contact/contact.component';

//pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoryEditComponent } from './conf/category/category-edit/category-edit.component';
import { CategoryIndexComponent } from './conf/category/category-index/category-index.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
// import { CondicionesComponent } from './condiciones/condiciones.component';




const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth

    //configuraciones
    { path: 'configuraciones',  component: ConfiguracionesComponent, data:{title:'Configuraciones'} },
    { path: 'buscar', component: BusquedaComponent, data:{tituloPage:'Busquedas'} },
    { path: 'buscar/:termino', component: BusquedaComponent, data:{tituloPage:'Busquedas'} },
    { path: 'rolesconf', component: RolesViewComponent, data:{title:'Planes'} },



    { path: 'categories', component: CategoryIndexComponent, data:{title:'Categoria'} },
    { path: 'category/:id', component: CategoryIndexComponent, data:{title:'Categoria'} },
    { path: 'categoria/crear', component: CategoryEditComponent, data:{title:'Crear Categoria'} },
    { path: 'category/edit/:id', component: CategoryEditComponent, data:{title:'Editar Categoria'} },
    
    { path: 'projects', component: ProjectListComponent, data:{title:'Proyecto'} },
    { path: 'projects/:id', component: ProjectListComponent, data:{title:'Proyecto'} },
    { path: 'project/crear', component: ProjectEditComponent, data:{title:'Crear Proyecto'} },
    { path: 'project/edit/:id', component: ProjectEditComponent, data:{title:'Editar Proyecto'} },

  
    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    // { path: 'condiciones/:id', component: CondicionesComponent, data:{title:'Editar Usuario'} },
    // { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },

    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
    { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },
    
   

    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },





]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }

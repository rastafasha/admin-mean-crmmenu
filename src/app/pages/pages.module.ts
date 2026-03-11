import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//modulos

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// paginacion
//paypal
// import { NgxPayPalModule } from 'ngx-paypal';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HelpComponent } from './help/help.component';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

// angular file uploader
// import { AngularFileUploaderModule } from 'angular-file-uploader';
//Qr
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ProjectModule } from './project/project.module';
// import { CursosModule } from './cursos/cursos.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    UserProfileComponent,
    BusquedaComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    PagesComponent,
    UserProfileComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    // CursosModule,
    NgxPaginationModule,
    CKEditorModule,
    ProjectModule
    // AngularFileUploaderModule,

  ],
  providers: [
  ],
})
export class PagesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfModule } from '../conf/conf.module';



@NgModule({
  declarations: [
    ProjectEditComponent,
    ProjectListComponent
  ],
  exports: [
    ProjectEditComponent,
    ProjectListComponent
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
        NgxPaginationModule,
        CKEditorModule,
  ]
})
export class ProjectModule { }

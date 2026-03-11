import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Angular plugin.
import { NgxPaginationModule } from 'ngx-pagination';
// import { NgxPayPalModule } from 'ngx-paypal';
// import { ChartComponent } from './chart/chart.component';
// import { NgChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';
import {PipesModule} from '../pipes/pipes.module';
import { EditoresComponent } from './editores/editores.component';
import { ModalCondicionesComponent } from './modal-condiciones/modal-condiciones.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChart2Component } from './charts/pie-chart2/pie-chart2.component';
import { ProjectitemComponent } from './projectitem/projectitem.component';
import { ProjecttypeeditComponent } from './projecttypeedit/projecttypeedit.component';
import { CategoryEditComponent } from '../pages/conf/category/category-edit/category-edit.component';
import { PagesModule } from '../pages/pages.module';
import { ConfModule } from '../pages/conf/conf.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UsuariosRecientesComponent,
    EditoresComponent,
    ModalCondicionesComponent,
    LineChartComponent,
    PieChart2Component,
    ProjectitemComponent,
    ProjecttypeeditComponent
  ],
  exports: [
    UsuariosRecientesComponent,
    EditoresComponent,
    ModalCondicionesComponent,
    LineChartComponent,
    PieChart2Component,
    ProjectitemComponent,
    ProjecttypeeditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    // NgxPayPalModule,
    NgxPaginationModule,
    ConfModule,
    SharedModule
  ]
})
export class ComponentsModule { }

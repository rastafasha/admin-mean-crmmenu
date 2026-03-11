import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuiconosComponent } from './menuiconos/menuiconos.component';
import { BannerplanesComponent } from './bannerplanes/bannerplanes.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// paginacion
// import { NgxPaginationModule } from 'ngx-pagination';

//paypal
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { BackButtnComponent } from './backButtn/backButtn.component';




@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule,
    FormsModule
    // NgxPaginationModule,

],
declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    MenuiconosComponent,
    BannerplanesComponent,
    SearchComponent,
    LoadingComponent,
    BackButtnComponent,
],
exports: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    MenuiconosComponent,
    BannerplanesComponent,
    SearchComponent,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    BackButtnComponent,
]
})
export class SharedModule { }

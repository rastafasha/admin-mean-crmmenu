import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentsComponent } from './payments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReportarPagoComponent } from './reportar-pago/reportar-pago.component';



@NgModule({
  declarations: [
    PaymentDetailsComponent,
    PaymentsComponent,
    ReportarPagoComponent
  ],
  exports: [
    PaymentDetailsComponent,
    PaymentsComponent,
    ReportarPagoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    ComponentsModule
  ]
})
export class PaymentsModule { }

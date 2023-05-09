import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-routing.module';



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }

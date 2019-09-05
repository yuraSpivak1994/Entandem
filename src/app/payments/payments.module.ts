import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from "./payments.component";
import { PaymentsRouterModule } from "./payments-router.module";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { MakePaymentComponent } from "./make-payment/make-payment.component";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [PaymentsComponent, MakePaymentComponent, PaymentHistoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaymentsRouterModule,
    CoreModule,
    SharedModule,
    MatIconModule
  ]
})
export class PaymentsModule { }

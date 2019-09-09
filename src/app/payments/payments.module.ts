import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from "./payments.component";
import { PaymentsRouterModule } from "./payments-router.module";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";
import { MakePaymentComponent } from "./make-payment/make-payment.component";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { FormsModule } from "@angular/forms";
import { SuccessfulComponent } from "./payment-check/successful/successful.component";
import { UnsuccessfulComponent } from "./payment-check/unsuccessful/unsuccessful.component";

@NgModule({
  declarations: [PaymentsComponent, MakePaymentComponent, PaymentHistoryComponent, SuccessfulComponent, UnsuccessfulComponent],
  imports: [
    CommonModule,
    RouterModule,
    PaymentsRouterModule,
    CoreModule,
    SharedModule,
    FormsModule
  ]
})
export class PaymentsModule { }

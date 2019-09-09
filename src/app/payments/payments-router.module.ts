import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentsComponent } from "./payments.component";
import { MakePaymentComponent } from "./make-payment/make-payment.component";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";
import { SuccessfulComponent } from "./payment-check/successful/successful.component";
import { UnsuccessfulComponent } from "./payment-check/unsuccessful/unsuccessful.component";

const routes: Routes = [
  {path: '', component: PaymentsComponent, children: [
      {path: 'make-payment', component: MakePaymentComponent},
      {path: 'payment-history', component: PaymentHistoryComponent},
      {path: 'successful', component: SuccessfulComponent},
      {path: 'unsuccessful', component: UnsuccessfulComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRouterModule {}

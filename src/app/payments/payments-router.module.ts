import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentsComponent } from "./payments.component";
import { MakePaymentComponent } from "./make-payment/make-payment.component";
import { PaymentHistoryComponent } from "./payment-history/payment-history.component";

const routes: Routes = [
  {path: '', component: PaymentsComponent, children: [
      {path: 'make-payment', component: MakePaymentComponent},
      {path: 'payment-history', component: PaymentHistoryComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRouterModule {}

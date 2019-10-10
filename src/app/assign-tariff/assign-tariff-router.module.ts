import { RouterModule, Routes } from "@angular/router";
import { AssignTariffComponent } from "./assign-tariff.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: '', component: AssignTariffComponent}
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignTariffRouterModule {}

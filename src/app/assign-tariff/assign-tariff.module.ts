import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignTariffRouterModule } from "./assign-tariff-router.module";
import { AssignTariffComponent } from "./assign-tariff.component";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AssignTariffComponent],
  imports: [
    CommonModule,
    AssignTariffRouterModule,
    CoreModule,
    SharedModule
  ]
})
export class AssignTariffModule { }

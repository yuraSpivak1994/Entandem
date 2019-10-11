import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignTariffRouterModule } from "./assign-tariff-router.module";
import { AssignDialog, AssignTariffComponent, UnitDialog } from "./assign-tariff.component";
import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [AssignTariffComponent, AssignDialog, UnitDialog],
  imports: [
    CommonModule,
    AssignTariffRouterModule,
    CoreModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [AssignDialog, UnitDialog]
})
export class AssignTariffModule { }

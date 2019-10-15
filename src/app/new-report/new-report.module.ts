import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReportComponent, TariffsDialog } from "./new-report.component";
import { NewReportRouterModule } from "./new-report-router-module";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [NewReportComponent, TariffsDialog],
  imports: [
    CommonModule,
    NewReportRouterModule,
    CoreModule,
    SharedModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [TariffsDialog]
})
export class NewReportModule { }

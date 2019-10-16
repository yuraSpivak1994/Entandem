import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReportComponent, TariffsDialog } from "./new-report.component";
import { NewReportRouterModule } from "./new-report-router-module";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";


@NgModule({
  declarations: [NewReportComponent, TariffsDialog],
  imports: [
    CommonModule,
    NewReportRouterModule,
    CoreModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NewReportComponent),
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [TariffsDialog]
})
export class NewReportModule { }

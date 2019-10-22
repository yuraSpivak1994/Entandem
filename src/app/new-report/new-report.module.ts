import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReportComponent, TariffsDialog } from "./new-report.component";
import { NewReportRouterModule } from "./new-report-router-module";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ReceptionComponent } from './modal/tariffs/reception/reception.component';
import { CircusesComponent } from './modal/tariffs/circuses/circuses.component';


@NgModule({
  declarations: [NewReportComponent, TariffsDialog, ReceptionComponent, CircusesComponent],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [TariffsDialog, ReceptionComponent, CircusesComponent]
})
export class NewReportModule { }

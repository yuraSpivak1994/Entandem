import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRouterModule } from './dashboard-router.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRouterModule,
    CoreModule
  ]
})
export class DashboardModule { }

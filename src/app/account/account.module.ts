import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AccountComponent } from './account.component';
import { AccountRouterModule } from './account-router.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    AccountRouterModule,
    CoreModule,
    FormsModule
  ]
})
export class AccountModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AccountComponent, ContactDialog, EmailDialog, PasswordDialog, ProfileDialog } from './account.component';
import { AccountRouterModule } from './account-router.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AccountComponent, EmailDialog, ProfileDialog, PasswordDialog, ContactDialog],
  imports: [
    CommonModule,
    RouterModule,
    AccountRouterModule,
    CoreModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EmailDialog, ProfileDialog, PasswordDialog, ContactDialog]
})
export class AccountModule { }

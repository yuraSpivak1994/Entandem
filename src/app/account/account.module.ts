import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountComponent, DeleteModal, EmailDialog, PasswordDialog, ProfileDialog, ContactModal } from './account.component';
import { AccountRouterModule } from './account-router.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountComponent, EmailDialog, ProfileDialog, PasswordDialog, DeleteModal, ContactModal],
  imports: [
    CommonModule,
    RouterModule,
    AccountRouterModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [EmailDialog, ProfileDialog, PasswordDialog, DeleteModal, ContactModal]
})
export class AccountModule { }

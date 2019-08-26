import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CoreComponent } from './core.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, CoreComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CoreComponent } from './core.component';

@NgModule({
  declarations: [HeaderComponent, CoreComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

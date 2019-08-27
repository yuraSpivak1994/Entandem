import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule, MatIconModule, MatListModule, MatToolbarModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaterialModule { }

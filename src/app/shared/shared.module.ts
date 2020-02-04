import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatTableModule, MatTooltipModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    /* Import Angular Material modules */
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    FormsModule,

    /* Export Angular Material modules */
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ],
  declarations: []
})
export class SharedModule {
}

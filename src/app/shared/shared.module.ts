import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { RussiaMapComponent } from './russia-map/russia-map.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    /* Import Angular Material modules */
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    FormsModule,

    /* Export project components */
    NavbarComponent,

    /* Export Angular Material modules */
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    RussiaMapComponent
  ],
  declarations: [NavbarComponent, RussiaMapComponent]
})
export class SharedModule {
}

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatGridListModule, MatIconModule, MatTableModule, MatTooltipModule} from '@angular/material';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {RussiaMapComponent} from './russia-map/russia-map.component';
import {FooterComponent} from './footer/footer.component';
import {ChartsModule} from 'ng2-charts';
import {DataTableComponent} from './data-table/data-table.component';
import {MetricsDialogComponent} from './metrics-dialog/metrics-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    RouterModule,

    /* Import Angular Material modules */
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    ChartsModule,
    FormsModule,

    /* Export project components */
    NavbarComponent,

    /* Export Angular Material modules */
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    RussiaMapComponent,
    FooterComponent,
    DataTableComponent
  ],
  declarations: [
    NavbarComponent,
    RussiaMapComponent,
    FooterComponent,
    DataTableComponent,
    MetricsDialogComponent
  ],
  entryComponents: [
    MetricsDialogComponent
  ]
})
export class SharedModule {
}

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatSlideToggleModule} from '@angular/material';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {RussiaMapComponent} from './russia-map/russia-map.component';
import {FooterComponent} from './footer/footer.component';
import {ChartsModule} from 'ng2-charts';
import {MetricsDialogComponent} from './metrics-dialog/metrics-dialog.component';
import {LineChartComponent} from './line-chart/line-chart.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    RouterModule,

    /* Import Angular Material modules */
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  exports: [
    CommonModule,
    ChartsModule,
    FormsModule,

    /* Export project components */
    NavbarComponent,
    RussiaMapComponent,
    FooterComponent,

    /* Export Angular Material modules */
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  declarations: [
    NavbarComponent,
    RussiaMapComponent,
    FooterComponent,
    MetricsDialogComponent,
    LineChartComponent
  ],
  entryComponents: [
    MetricsDialogComponent
  ]
})
export class SharedModule {
}

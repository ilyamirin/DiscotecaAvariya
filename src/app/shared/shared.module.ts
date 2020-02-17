import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {RussiaMapComponent} from './russia-map/russia-map.component';
import {FooterComponent} from './footer/footer.component';
import {ChartsModule} from 'ng2-charts';
import {MetricsDialogComponent} from './metrics-dialog/metrics-dialog.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {AddDataDialogComponent} from './add-data-dialog/add-data-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    /* Import Angular Material modules */
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,

    /* Export project components */
    NavbarComponent,
    RussiaMapComponent,
    FooterComponent,

    /* Export Angular Material modules */
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: [
    NavbarComponent,
    RussiaMapComponent,
    FooterComponent,
    MetricsDialogComponent,
    LineChartComponent,
    AddDataDialogComponent
  ],
  entryComponents: [
    AddDataDialogComponent,
    MetricsDialogComponent
  ]
})
export class SharedModule {
}

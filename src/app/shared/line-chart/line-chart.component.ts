import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartType} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {ChartParams} from '../../core/models/chart-params.model';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input()
  chartParams: ChartParams;

  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  constructor() {
  }

  ngOnInit() {
  }

}

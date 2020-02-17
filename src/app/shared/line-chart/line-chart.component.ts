import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartType} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {Chart} from '../../core/models';
import {BaseChartDirective} from 'ng2-charts';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() chartParams: Chart;

  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  constructor() {
  }

  ngOnInit() {
  }

}

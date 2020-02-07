import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    {data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420], label: 'Количество детей-сирот, нуждающихся в жилье', yAxisID: 'y-axis-1'}
  ];

  lineChartLabels: Label[];

  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Год'
        },
      }],
      yAxes: [
        {
          id: 'y-axis-1',
          position: 'left',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          },
          scaleLabel: {
            display: true,
            labelString: 'Количество детей-сирот'
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(0, 255, 0, 0.3)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  lineChartLegend = true;
  lineChartType = 'line';

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  constructor() {
    this.lineChartLabels = [];
  }

  ngOnInit() {
    this.generateChartLabels();
  }

  private generateChartLabels() {
    const startYear = 2013;
    const endYear = 2026;

    for (let i = startYear; i < endYear; i++) {
      this.lineChartLabels.push(i.toString());
    }
  }

}

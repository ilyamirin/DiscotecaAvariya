import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Количество детей-сирот, нуждающихся в жилье'
    }
  ];

  lineChartLabels: Label[];

  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Год'
          }
        }
      ],
      yAxes: [
        {
          position: 'left',
          gridLines: {
            color: 'rgba(255,193,7,0.3)',
          },
          ticks: {
            fontColor: 'rgb(255,193,7)',
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
          value: '2026',
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'red',
            content: 'Конец плана'
          }
        },
      ],
    }
  };

  lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(255,51,181,0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [pluginAnnotations];


  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  constructor() {
    this.lineChartLabels = [];
  }

  ngOnInit() {
    this.generateChartLabels();
  }

  private generateChartLabels() {
    const startYear = 2013;
    const endYear = 2030;

    for (let i = startYear; i < endYear; i++) {
      this.lineChartLabels.push(i.toString());
    }
  }

}

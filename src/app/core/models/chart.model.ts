import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';


export class Chart {
  private static readonly defaultStartYear = 2020;
  private static readonly defaultEndYear = 2030;

  private static readonly fontSize = 18;

  chartLabels: Label[];
  chartData: ChartDataSets[];
  chartOptions: (ChartOptions & { annotation: any });
  chartColors: Color[];

  constructor() {
    this.chartLabels = Chart.generateChartLabels(Chart.defaultStartYear, Chart.defaultEndYear);
    this.chartData = [];
    this.chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Число детей-сирот в регионе',
        fontSize: Chart.fontSize
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              fontSize: Chart.fontSize,
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
              fontSize: Chart.fontSize,
              labelString: 'Число детей-сирот'
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
            value: undefined,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'red',
              content: 'Конец плана'
            }
          },
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: undefined,
            borderColor: '#673ab7',
            borderWidth: 2,
            label: {
              enabled: true,
              fontColor: 'red',
              content: 'Прогноз'
            }
          }
        ],
      }
    };
    this.chartColors = [];
  }

  static generateChartLabels(startYear: number, endYear: number) {
    const lineChartLabels: Label[] = [];

    for (let i = startYear; i <= endYear; i++) {
      lineChartLabels.push(i.toString());
    }

    return lineChartLabels;
  }
}

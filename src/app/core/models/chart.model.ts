import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartTitleOptions} from 'chart.js';


export class Chart {
  private static readonly defaultStartYear = 2016;
  private static readonly currentYear = new Date().getFullYear();
  private static readonly deadline = 2026;
  private static readonly defaultEndYear = 2030;

  private static readonly fontSize = 18;

  chartLabels: Label[];
  chartData: ChartDataSets[];
  chartOptions: (ChartOptions & { annotation: any });
  chartColors: Color[];

  constructor(chartData: ChartDataSets[]) {
    this.chartLabels = Chart.generateChartLabels(Chart.defaultStartYear, Chart.defaultEndYear);
    this.chartData = chartData;
    this.chartOptions = {
      responsive: true,
      title: {
        display: true,
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
            value: Chart.deadline.toString(),
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
            value: Chart.currentYear.toString(),
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
    this.chartColors = [
      {
        backgroundColor: 'rgba(255,51,181,0.3)',
        borderColor: 'rgb(255,193,7)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      }
    ];
  }

  static generateChartLabels(startYear: number, endYear: number) {
    const lineChartLabels: Label[] = [];

    for (let i = startYear; i <= endYear; i++) {
      lineChartLabels.push(i.toString());
    }

    return lineChartLabels;
  }

  setBackgroundColor(backgroundColor: string) {
    const colorIndex = 0;
    this.chartColors[colorIndex].backgroundColor = backgroundColor;
  }

  setOptions(title: string, yAxeLabel: string) {
    this.chartOptions.title.text = title;
    this.chartOptions.scales.yAxes[0].scaleLabel.labelString = yAxeLabel;
  }
}

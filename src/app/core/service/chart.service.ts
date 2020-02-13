import {Injectable} from '@angular/core';
import {Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private data: ChartDataSets[];
  private options: (ChartOptions & { annotation: any });
  private colors: Color[];

  constructor() {
    this.data = [];
    this.options = {
      responsive: true,
      title: {
        display: true,
        text: 'Число детей-сирот в регионе',
        fontSize: undefined
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              fontSize: undefined,
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
              fontSize: undefined,
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
    this.colors = [];
  }


  setData(data: Array<number | null | undefined>, label: string) {
  }

  setOptions() {
  }

  setColors() {
  }

  generateChartLabels(startYear: number, endYear: number) {
    const lineChartLabels: Label[] = [];

    for (let i = startYear; i <= endYear; i++) {
      lineChartLabels.push(i.toString());
    }

    return lineChartLabels;
  }
}

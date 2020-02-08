import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ChartParams, Region} from '../../core/models';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';


@Component({
  selector: 'app-metrics-dialog',
  templateUrl: './metrics-dialog.component.html',
  styleUrls: ['./metrics-dialog.component.scss']
})
export class MetricsDialogComponent implements OnInit {

  private fontSize = 18;
  private deadline = 2026;

  // FIXME: chart fields can't be inside methods
  private lineChartLabels: Label[];

  /*Количество детей-сирот в регионе*/
  private orphansInSubjectChartData: ChartDataSets[] = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Количество детей-сирот в регионе'
    }
  ];
  private orphansInSubjectChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: this.fontSize,
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
            fontSize: this.fontSize,
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
          value: this.deadline.toString(),
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
  private orphansInSubjectChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,51,181,0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Количество детей-сирот, нуждающихся в жилье*/
  private orphansNeedHousingChartData = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Количество детей-сирот, нуждающихся в жилье'
    }
  ];
  private orphansNeedHousingChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: this.fontSize,
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
            fontSize: this.fontSize,
            labelString: 'Количество детей-сирот, нуждающихся в жилье'
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
          value: this.deadline.toString(),
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
  private orphansNeedHousingChartColors = [
    {
      backgroundColor: 'rgba(43, 187, 173, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Количество выданных квартир*/
  private numberApartmentsIssuedChartData = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Количество выданных квартир'
    }
  ];
  private numberApartmentsIssuedChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: this.fontSize,
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
            fontSize: this.fontSize,
            labelString: 'Количество выданных квартир'
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
          value: this.deadline.toString(),
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
  private numberApartmentsIssuedChartColors = [
    {
      backgroundColor: 'rgba(156, 39, 176, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Размер финансирования*/
  private financingAmountChartData = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Размер финансирования'
    }
  ];
  private financingAmountChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: this.fontSize,
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
            fontSize: this.fontSize,
            labelString: 'Размер финансирования'
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
          value: this.deadline.toString(),
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
  private financingAmountChartColors = [
    {
      backgroundColor: 'rgba(33, 150, 243, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Стоимость жилья*/
  private houseCostChartData = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Стоимость жилья'
    }
  ];
  private houseCostChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: this.fontSize,
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
            fontSize: this.fontSize,
            labelString: 'Стоимость жилья'
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
          value: this.deadline.toString(),
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
  private houseCostChartColors = [
    {
      backgroundColor: 'rgba(0, 188, 212, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Число сотрудников*/
  private employeesNumberData = [
    {
      data: [180, 200, 240, 250, 290, 320, 340, 360, 370, 400, 405, 410, 420],
      label: 'Число сотрудников'
    }
  ];
  private employeesNumberOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            fontSize: this.fontSize,
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
            fontSize: this.fontSize,
            labelString: 'Число сотрудников'
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
          value: this.deadline.toString(),
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
  private employeesNumberColors = [
    {
      backgroundColor: 'rgba(255, 235, 59, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  region: Region;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: MetricsDialogComponent
  ) {
    this.lineChartLabels = [];
  }

  ngOnInit() {
    this.region = this.data.region;
    this.generateChartLabels();
  }

  private generateChartLabels() {
    const startYear = 2013;
    const endYear = 2030;

    for (let i = startYear; i < endYear; i++) {
      this.lineChartLabels.push(i.toString());
    }
  }

  /*Количество детей-сирот в регионе*/
  generateOrphansInSubjectChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.orphansInSubjectChartData,
      lineChartOptions: this.orphansInSubjectChartOptions,
      lineChartColors: this.orphansInSubjectChartColors
    };

    return chartParams;
  }

  /*Количество детей-сирот, нуждающихся в жилье*/
  generateOrphansNeedHousingChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.orphansNeedHousingChartData,
      lineChartOptions: this.orphansNeedHousingChartOptions,
      lineChartColors: this.orphansNeedHousingChartColors
    };

    return chartParams;
  }

  /*Количество выданных квартир*/
  generateNumberApartmentsIssuedChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.numberApartmentsIssuedChartData,
      lineChartOptions: this.numberApartmentsIssuedChartOptions,
      lineChartColors: this.numberApartmentsIssuedChartColors
    };

    return chartParams;
  }

  /*Размер финансирования*/
  generateFinancingAmountChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.financingAmountChartData,
      lineChartOptions: this.financingAmountChartOptions,
      lineChartColors: this.financingAmountChartColors
    };

    return chartParams;
  }

  /*Стоимость жилья*/
  generateHouseCostChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.houseCostChartData,
      lineChartOptions: this.houseCostChartOptions,
      lineChartColors: this.houseCostChartColors
    };

    return chartParams;
  }

  /*Число сотрудников*/
  generateEmployeesNumberChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.employeesNumberData,
      lineChartOptions: this.employeesNumberOptions,
      lineChartColors: this.employeesNumberColors
    };

    return chartParams;
  }

}

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ChartParams, Region} from '../../core/models';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';


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
      data: [undefined, undefined, 9231, 8829, 8414, 7926, 7530, 7153, 6796, 6456, 6133, 5826, 5535, 5258, 4995, 4746, 4508],
      label: 'Количество детей-сирот в регионе'
    }
  ];
  private orphansInSubjectChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Число детей-сирот в регионе',
      fontSize: this.fontSize
    },
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
      data: [undefined, 2500, undefined, 4000, 6552, 7322, 7489, 7908, 8351, 8819, 9312, 9834, 10385, 10966],
      label: 'Негативный прогноз'
    },
    {
      data: [undefined, undefined, undefined, 6385, 6552, 7322, 7489, 7639, 7792, 7947, 8106, 8268, 8433, 8602],
      label: 'Позитивный прогноз',
    }
  ];
  private orphansNeedHousingChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Число детей-сирот, нуждающихся в жилье',
      fontSize: this.fontSize
    },
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
      data: [undefined, undefined, 465, 522, 265, 318, 710, 800, 800, 800, 800, 800, 800, 800],
      label: 'Количество выданных квартир'
    }
  ];
  private numberApartmentsIssuedChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Количество выданных квартир',
      fontSize: this.fontSize
    },
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
      data: [undefined, undefined, undefined, undefined, undefined, undefined, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000],
      label: 'Региональное финансирование'
    },
    {
      data: [undefined, undefined, undefined, undefined, undefined, undefined, 349000000, 349000000, 349000000, 349000000, 349000000, 349000000, 349000000],
      label: 'Федеральное финансирование'
    }
  ];
  private financingAmountChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Размер финансирования',
      fontSize: this.fontSize
    },
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
      data: [76921.04, 75048.23, 86324.75, 84103.66, 82700.94, 83993.62, 93433.13],
      label: 'Реальная'
    },
    {
      data: [77415.91, 73766.11, 83490.86, 80981.44, 79028.45, 83407.52, 90816.7],
      label: 'По минстрою'
    }
  ];
  private houseCostChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Стоимость жилья',
      fontSize: this.fontSize
    },
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
  private employeesNumberChartData = [
    {
      data: [39, 39, 39, 39, 39, 39, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106],
      label: 'Число сотрудников'
    }
  ];
  private employeesNumberChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Число сотрудников, занимающихся вопросом',
      fontSize: this.fontSize
    },
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
  private employeesNumberChartColors = [
    {
      backgroundColor: 'rgba(255, 235, 59, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*"Что будет, если ничего не менять?"*/
  private asIsChartData = [
    {
      data: this.finalResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
      label: 'Число детей-сирот'
    }
  ];
  private asIsChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: '\"Что будет, если ничего не менять?\"',
      fontSize: this.fontSize
    },
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
  private asIsChartColors = [
    {
      backgroundColor: 'rgba(255, 235, 59, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Динамический график "Поручение Медведева ликвидировать очередь к 2026"*/
  private dynamicChartData = [
    {
      data: this.finalResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
      label: 'Число детей-сирот'
    }
  ];
  private dynamicChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Поручение Медведева ликвидировать очередь к 2026',
      fontSize: this.fontSize
    },
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
  private dynamicChartColors = [
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
  value = 1;

  @ViewChild('dynamicChart', {static: true}) dynamicChart: BaseChartDirective;

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

  private finalResult(param) {
    return param;
  }

  onChangeValue($event: any) {
    for (let i = 0; i < this.dynamicChartData.length; i++) {
      for (let j = 0; j < this.dynamicChartData[i].data.length; j++) {
        this.dynamicChartData[i].data[j] = this.generateNumber(i);
      }
    }

    this.dynamicChart.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
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
      lineChartData: this.employeesNumberChartData,
      lineChartOptions: this.employeesNumberChartOptions,
      lineChartColors: this.employeesNumberChartColors
    };

    return chartParams;
  }

  /*"Что будет, если ничего не менять?"*/
  generateAsIsChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.asIsChartData,
      lineChartOptions: this.asIsChartOptions,
      lineChartColors: this.asIsChartColors
    };

    return chartParams;
  }

  /*Динамический график "Поручение Медведева ликвидировать очередь к 2026"*/
  generateDynamicChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.lineChartLabels,
      lineChartData: this.dynamicChartData,
      lineChartOptions: this.dynamicChartOptions,
      lineChartColors: this.dynamicChartColors
    };

    return chartParams;
  }

}

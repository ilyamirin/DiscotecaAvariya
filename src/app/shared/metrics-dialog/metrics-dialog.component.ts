import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ChartParams, Region} from '../../core/models';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartService, FirebaseService} from '../../core/services';


@Component({
  selector: 'app-metrics-dialog',
  templateUrl: './metrics-dialog.component.html',
  styleUrls: ['./metrics-dialog.component.scss']
})
export class MetricsDialogComponent implements OnInit {

  region: Region;

  newlyIdentifiedOrphansValue: number;
  financingAmountValue: number;
  squareNormValue: number;
  pricePerSquareMeterValue: number;

  @ViewChild('dynamicChart', {static: true}) dynamicChart: BaseChartDirective;

  private fontSize = 18;
  private currentYear = new Date().getFullYear();
  private deadline = 2026;

  private reductionCoefficient = 0.95;
  private growthCoefficient = 1.056;
  private apartmentsIssuedCoefficient = 800;

  private lineChartLabels: Label[];
  private resultChartsLabels: Label[];

  /*Количество детей-сирот в регионе*/
  private orphansInSubjectChartData: ChartDataSets[] = [
    {
      data: [8829, 8414, 7926, 7530, 7153, 6796, 6456, 6133, 5826, 5535, 5258, 4995, 4746, 4508, 4283],
      label: 'Количество детей-сирот в регионе'
    },
    {
      data: [1232, 902, 938, 891, 847, 804, 764, 726, 690, 655, 622, 591, 562, 534, 507],
      label: 'Выявление детей-сирот'
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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.currentYear.toString(),
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
      data: [6385, 6552, 7322, 7489, 7908, 8351, 8819, 9312, 9834, 10385, 10966, 11581, 12229, 12914, 13637],
      label: 'Негативный прогноз'
    },
    {
      data: [6385, 6552, 7322, 7489, 7639, 7792, 7947, 8106, 8268, 8433, 8603, 8775, 8950, 9129, 9312],
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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.currentYear.toString(),
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
      data: [522, 265, 318, 710, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800],
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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.currentYear.toString(),
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
      data: [287529964.5, 277250000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000, 1000000000],
      label: 'Региональное финансирование'
    },
    {
      data: [252669200, 382000000, 33839671.5, 349000000, 349000000, 349000000, 349000000, 349000000, 349000000, 349000000, 349000000],
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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.currentYear.toString(),
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
      data: [65751.2, 64528.4, 67652.1, 80769.7, 86787, 93252.7, 100200, 107664.9, 115685.9, 124304.5, 133565.2, 143515.8, 154207.8, 165696.2, 178040.6],
      label: 'Реальная'
    },
    {
      data: [48532, 49163, 56134, 62382, 67996.4, 74116, 80786.5, 88057.3, 95982.4, 104620.9, 114036.7, 124300, 135487, 147680.9, 160972.2],
      label: 'По минстрою'
    }
  ];
  private houseCostChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Стоимость жилья (за кв. м.)',
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
            labelString: 'Стоимость жилья (за кв. м.)'
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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.currentYear.toString(),
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
      data: [39, 39, 39, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106, 106],
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
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.currentYear.toString(),
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
      data: this.asIsData(),
      label: 'Число детей-сирот, стоящих в очереди'
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
            labelString: 'Число детей-сирот, стоящих в очереди'
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
        }
      ]
    }
  };
  private asIsChartColors = [
    {
      backgroundColor: 'rgba(103, 58, 183, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  /*Динамический график "Поручение Правительства РФ ликвидировать очередь к 2026"*/
  private dynamicChartData = [
    {
      data: this.asIsData(),
      label: 'Число детей-сирот, стоящих в очереди'
    }
  ];
  private dynamicChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    title: {
      display: true,
      text: 'Поручение Правительства РФ ликвидировать очередь к 2026 году',
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
            labelString: 'Число детей-сирот, стоящих в очереди'
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
        }
      ]
    }
  };
  private dynamicChartColors = [
    {
      backgroundColor: 'rgba(118, 255, 3, 0.3)',
      borderColor: 'rgb(255,193,7)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MetricsDialogComponent,
    private chartService: ChartService,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit() {
    this.region = this.data.region;
    this.lineChartLabels = this.chartService.generateChartLabels(2016, 2030);
    this.resultChartsLabels = this.chartService.generateChartLabels(2020, 2044);

    const year2020Index = 4;

    this.newlyIdentifiedOrphansValue = this.orphansInSubjectChartData[1].data[year2020Index] as number;
    this.financingAmountValue = this.financingAmountChartData[0].data[year2020Index] +
      this.financingAmountChartData[1].data[year2020Index];
    this.squareNormValue = 30;
    this.pricePerSquareMeterValue = this.houseCostChartData[0].data[year2020Index];
  }

  formatFinancingAmountValue(value: number) {
    const limit = 1000000000;
    if (value >= limit) {
      return value / limit + ' млрд.';
    }

    return value;
  }

  formatSquareNormValue(value: number) {
    const limit = 1000;
    if (value >= limit) {
      return value / limit + ' тыс.';
    }

    return value;
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
      lineChartLabels: this.resultChartsLabels,
      lineChartData: this.asIsChartData,
      lineChartOptions: this.asIsChartOptions,
      lineChartColors: this.asIsChartColors
    };

    return chartParams;
  }

  /*Динамический график "Поручение Правительства РФ ликвидировать очередь к 2026"*/
  generateDynamicChart() {
    const chartParams: ChartParams = {
      lineChartLabels: this.resultChartsLabels,
      lineChartData: this.dynamicChartData,
      lineChartOptions: this.dynamicChartOptions,
      lineChartColors: this.dynamicChartColors
    };

    return chartParams;
  }

  onChangeValue($event: any) {
    const orphansNeedHousing = this.orphansNeedHousingChartData[0].data;

    const year2020Index = 4;
    const year2030Index = 14;
    const year2044Index = 28;

    for (let i = year2030Index; i <= year2044Index; i++) {
      orphansNeedHousing.push(Math.round(orphansNeedHousing[i] * this.growthCoefficient));
    }

    let prediction;
    for (let j = year2020Index; j < year2044Index; j++) {
      if (j === year2020Index) {
        prediction = this.predictDynamicResult(
          orphansNeedHousing[j - 1],
          this.newlyIdentifiedOrphansValue,
          this.financingAmountValue,
          this.squareNormValue,
          this.pricePerSquareMeterValue
        );
      } else {
        prediction = this.predictDynamicResult(
          prediction,
          this.newlyIdentifiedOrphansValue,
          this.financingAmountValue,
          this.squareNormValue,
          this.pricePerSquareMeterValue
        );
      }

      this.dynamicChartData[0].data[j] = prediction;
    }

    this.dynamicChart.chart.update();
  }

  private asIsData() {
    const orphansNeedHousing = this.orphansNeedHousingChartData[0].data;
    const newlyIdentifiedOrphans = this.orphansInSubjectChartData[1].data;
    const numberApartmentsIssued = this.numberApartmentsIssuedChartData[0].data;

    const year2020Index = 4;
    const year2030Index = 14;
    const year2044Index = 28;

    for (let i = year2030Index; i <= year2044Index; i++) {
      orphansNeedHousing.push(Math.round(orphansNeedHousing[i] * this.growthCoefficient));
      newlyIdentifiedOrphans.push(Math.round((newlyIdentifiedOrphans[i] as number) * this.reductionCoefficient));
      numberApartmentsIssued.push(this.apartmentsIssuedCoefficient);
    }

    const orphansNumber = [];

    let prediction;
    for (let j = year2020Index; j <= year2044Index; j++) {
      if (j === year2020Index) {
        prediction = this.predictAsIsResult(
          orphansNeedHousing[j - 1],
          newlyIdentifiedOrphans[j] as number,
          numberApartmentsIssued[j]
        );
      } else {
        prediction = this.predictAsIsResult(
          prediction,
          newlyIdentifiedOrphans[j] as number,
          numberApartmentsIssued[j]
        );
      }

      orphansNumber.push(prediction);
    }

    return orphansNumber;
  }

  private predictAsIsResult(orphansNeedHousing: number, newlyIdentifiedOrphans: number, numberApartmentsIssued: number) {
    const prediction = orphansNeedHousing + newlyIdentifiedOrphans - numberApartmentsIssued;

    return isNaN(prediction) ? undefined : (prediction < 0 ? 0 : prediction);
  }

  private predictDynamicResult(
    orphansNeedHousing: number,
    newlyIdentifiedOrphans: number,
    financingAmount: number,
    squareNorm: number,
    pricePerSquareMeter: number
  ) {
    const numberApartmentsIssued = Math.floor(financingAmount / (squareNorm * pricePerSquareMeter));
    const prediction = orphansNeedHousing + newlyIdentifiedOrphans - numberApartmentsIssued;

    return isNaN(prediction) ? undefined : (prediction < 0 ? 0 : prediction);
  }
}

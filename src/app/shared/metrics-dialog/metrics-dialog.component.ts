import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Chart, Collections, MetricCoefficients, Region, RegionStatistics, RegionStatus} from '../../core/models';
import {BaseChartDirective} from 'ng2-charts';
import {FirebaseService} from '../../core/services';


@Component({
  selector: 'app-metrics-dialog',
  templateUrl: './metrics-dialog.component.html',
  styleUrls: ['./metrics-dialog.component.scss']
})
export class MetricsDialogComponent implements OnInit {

  private orphansInSubject: number[];
  private newlyIdentifiedOrphans: number[];
  private orphansNeedHousingNegative: number[];
  private orphansNeedHousingPositive: number[];
  private apartmentsNumberIssued: number[];
  private regionalFunding: number[];
  private federalFunding: number[];
  private realHousingCost: number[];
  private minstroyHousingCost: number[];
  private employeesNumber: number[];

  private metricCoefficients: MetricCoefficients;

  private orphansInSubjectChart: Chart;
  private orphansNeedHousingChart: Chart;
  private apartmentsNumberIssuedChart: Chart;
  private financingAmountChart: Chart;
  private houseCostChart: Chart;
  private employeesNumberChart: Chart;
  private asIsChart: Chart;

  private finalChart: Chart;

  newlyIdentifiedOrphansValue: number;
  financingAmountValue: number;
  squareNormValue: number;
  pricePerSquareMeterValue: number;

  region: Region;
  regionStatus: RegionStatus;
  regionData: RegionStatistics[];

  isAllDataLoaded: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MetricsDialogComponent,
    private firebaseService: FirebaseService,
    private dialogRef: MatDialogRef<MetricsDialogComponent>,
  ) {
  }

  @ViewChild('dynamicChart', {static: false}) dynamicChart: BaseChartDirective;

  private static predictAsIsResult(orphansNeedHousing: number, newlyIdentifiedOrphans: number, numberApartmentsIssued: number) {
    return this.predict(orphansNeedHousing, newlyIdentifiedOrphans, numberApartmentsIssued);
  }

  private static predictDynamicResult(orphansNeedHousing: number, newlyIdentifiedOrphans: number, financingAmount: number,
                                      squareNorm: number, pricePerSquareMeter: number) {
    const numberApartmentsIssued = Math.floor(financingAmount / (squareNorm * pricePerSquareMeter));
    return this.predict(orphansNeedHousing, newlyIdentifiedOrphans, numberApartmentsIssued);
  }

  private static predict(orphansNeedHousing: number, newlyIdentifiedOrphans: number, numberApartmentsIssued: number) {
    const prediction = orphansNeedHousing + newlyIdentifiedOrphans - numberApartmentsIssued;

    return isNaN(prediction) ? undefined : (prediction < 0 ? 0 : prediction);
  }

  ngOnInit() {
    this.region = this.data.region;
    this.regionStatus = this.data.regionStatus;

    this.orphansInSubject = [];
    this.newlyIdentifiedOrphans = [];
    this.orphansNeedHousingNegative = [];
    this.orphansNeedHousingPositive = [];
    this.apartmentsNumberIssued = [];
    this.regionalFunding = [];
    this.federalFunding = [];
    this.realHousingCost = [];
    this.minstroyHousingCost = [];
    this.employeesNumber = [];

    this.firebaseService.get(this.region.id).subscribe(data => {
      this.regionData = data as RegionStatistics[];

      this.regionData.forEach(value => {
        this.orphansInSubject.push(value.orphansInSubject);
        this.newlyIdentifiedOrphans.push(value.newlyIdentifiedOrphans);
        this.orphansNeedHousingNegative.push(value.orphansNeedHousingNegative);
        this.orphansNeedHousingPositive.push(value.orphansNeedHousingPositive);
        this.apartmentsNumberIssued.push(value.apartmentsNumberIssued);
        this.regionalFunding.push(value.regionalFunding);
        this.federalFunding.push(value.federalFunding);
        this.realHousingCost.push(value.realHousingCost);
        this.minstroyHousingCost.push(value.minstroyHousingCost);
        this.employeesNumber.push(value.employeesNumber);
      });

      this.orphansInSubjectChart = new Chart([
        {
          data: this.orphansInSubject,
          label: 'Число детей-сирот в регионе'
        },
        {
          data: this.newlyIdentifiedOrphans,
          label: 'Вновь выявленные дети-сироты'
        }
      ]);
      this.orphansNeedHousingChart = new Chart([
        {
          data: this.orphansNeedHousingNegative,
          label: 'Негативный прогноз'
        },
        {
          data: this.orphansNeedHousingPositive,
          label: 'Позитивный прогноз'
        }
      ]);
      this.apartmentsNumberIssuedChart = new Chart([
        {
          data: this.apartmentsNumberIssued,
          label: 'Количество выданных квартир'
        }
      ]);
      this.financingAmountChart = new Chart([
        {
          data: this.regionalFunding,
          label: 'Региональное финансирование'
        },
        {
          data: this.federalFunding,
          label: 'Федеральное финансирование'
        }
      ]);
      this.houseCostChart = new Chart([
        {
          data: this.realHousingCost,
          label: 'Реальная'
        },
        {
          data: this.minstroyHousingCost,
          label: 'По минстрою'
        }
      ]);
      this.employeesNumberChart = new Chart([
        {
          data: this.employeesNumber,
          label: 'Число сотрудников'
        }
      ]);

      const initValueIndex = 4;

      this.newlyIdentifiedOrphansValue = this.newlyIdentifiedOrphans[initValueIndex];
      this.financingAmountValue = this.federalFunding[initValueIndex] + this.regionalFunding[initValueIndex];
      this.pricePerSquareMeterValue = this.realHousingCost[initValueIndex];

      this.firebaseService.getById(Collections.COEFFICIENT, this.region.id).subscribe(res => {
        this.metricCoefficients = res as MetricCoefficients;

        this.squareNormValue = this.metricCoefficients.squareNorm;

        this.asIsChart = new Chart([
          {
            data: this.asIsData(this.metricCoefficients),
            label: 'Число детей-сирот, стоящих в очереди'
          }
        ], 2020, 2044);
        this.finalChart = new Chart([
          {
            data: this.asIsData(this.metricCoefficients),
            label: 'Число детей-сирот, стоящих в очереди'
          }
        ], 2020, 2044);

        this.isAllDataLoaded = true;
      });
    });
  }

  onCloseClick() {
    this.dialogRef.close({
      regionStatus: this.regionStatus
    });
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

  generateOrphansInSubjectChart() {
    this.orphansInSubjectChart.setOptions('Число детей-сирот в регионе', 'Число детей-сирот');
    return this.orphansInSubjectChart;
  }

  generateOrphansNeedHousingChart() {
    this.orphansNeedHousingChart.setOptions('Число детей-сирот, нуждающихся в жилье', 'Число детей-сирот');
    return this.orphansNeedHousingChart;
  }

  generateApartmentsNumberIssuedChart() {
    this.apartmentsNumberIssuedChart.setOptions('Количество выданных квартир', 'Количество выданных квартир');
    return this.apartmentsNumberIssuedChart;
  }

  generateFinancingAmountChart() {
    this.financingAmountChart.setOptions('Размер финансирования', 'Размер финансирования');
    return this.financingAmountChart;
  }

  generateHouseCostChart() {
    this.houseCostChart.setOptions('Стоимость жилья (за кв. м.)', 'Стоимость жилья (за кв. м.)');
    return this.houseCostChart;
  }

  generateEmployeesNumberChart() {
    this.employeesNumberChart.setOptions('Число сотрудников, занимающихся вопросом', 'Число сотрудников');
    return this.employeesNumberChart;
  }

  generateAsIsChart() {
    this.asIsChart.setOptions('\"Что будет, если ничего не менять?\"', 'Число детей-сирот, стоящих в очереди');
    return this.asIsChart;
  }

  generateFinalChart() {
    this.finalChart.setOptions('Поручение Правительства РФ ликвидировать очередь', 'Число детей-сирот, стоящих в очереди');
    return this.finalChart;
  }

  onChangeValue($event: any) {
    if (this.metricCoefficients !== undefined) {
      const orphansNeedHousingNegative = this.orphansNeedHousingNegative;

      const year2020Index = 4;
      const year2030Index = 14;
      const year2044Index = 28;

      for (let i = year2030Index; i <= year2044Index; i++) {
        orphansNeedHousingNegative.push(Math.round(orphansNeedHousingNegative[i] *
          this.metricCoefficients.orphansNeedHousingNegativeCoefficient));
      }

      let prediction;
      for (let j = year2020Index; j < year2044Index; j++) {
        if (j === year2020Index) {
          prediction = MetricsDialogComponent.predictDynamicResult(
            orphansNeedHousingNegative[j - 1],
            this.newlyIdentifiedOrphansValue,
            this.financingAmountValue,
            this.squareNormValue,
            this.pricePerSquareMeterValue
          );
        } else {
          prediction = MetricsDialogComponent.predictDynamicResult(
            prediction,
            this.newlyIdentifiedOrphansValue,
            this.financingAmountValue,
            this.squareNormValue,
            this.pricePerSquareMeterValue
          );
        }

        this.finalChart.chartData[0].data[j] = prediction;
      }

      this.dynamicChart.chart.update();
    }
  }

  private asIsData(metricCoefficients: MetricCoefficients) {
    if (metricCoefficients !== undefined) {
      const orphansNeedHousingNegative = this.orphansNeedHousingNegative;
      const newlyIdentifiedOrphans = this.newlyIdentifiedOrphans;
      const apartmentsNumberIssued = this.apartmentsNumberIssued;

      const year2020Index = 4;
      const year2030Index = 14;
      const year2044Index = 28;

      for (let i = year2030Index; i <= year2044Index; i++) {
        orphansNeedHousingNegative.push(Math.round(orphansNeedHousingNegative[i] *
          metricCoefficients.orphansNeedHousingNegativeCoefficient));
        newlyIdentifiedOrphans.push(Math.round((newlyIdentifiedOrphans[i] as number) *
          metricCoefficients.newlyIdentifiedOrphansCoefficient));
        apartmentsNumberIssued.push(apartmentsNumberIssued[i] * metricCoefficients.apartmentsNumberIssuedCoefficient);
      }

      const orphansNumber = [];

      let prediction;
      for (let j = year2020Index; j <= year2044Index; j++) {
        if (j === year2020Index) {
          prediction = MetricsDialogComponent.predictAsIsResult(
            orphansNeedHousingNegative[j - 1],
            newlyIdentifiedOrphans[j] as number,
            apartmentsNumberIssued[j]
          );
        } else {
          prediction = MetricsDialogComponent.predictAsIsResult(
            prediction,
            newlyIdentifiedOrphans[j] as number,
            apartmentsNumberIssued[j]
          );
        }

        orphansNumber.push(prediction);
      }

      if (orphansNumber[year2020Index] === 0) {
        this.regionStatus = RegionStatus.GOOD;
      } else if (orphansNumber[year2030Index] === 0) {
        this.regionStatus = RegionStatus.ACCEPTABLE;
      } else {
        this.regionStatus = RegionStatus.CRITICAL;
      }

      return orphansNumber;
    } else {
      return [];
    }
  }
}

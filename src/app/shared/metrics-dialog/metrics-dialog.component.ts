import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Chart, Collections, MetricCoefficients, Region, RegionStatistics} from '../../core/models';
import {BaseChartDirective, Label} from 'ng2-charts';
import {ChartService, FirebaseService} from '../../core/services';


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

  private dynamicChartLabels: Label[];

  private orphansInSubjectChart: Chart;
  private orphansNeedHousingChart: Chart;
  private apartmentsNumberIssuedChart: Chart;
  private financingAmountChart: Chart;
  private houseCostChart: Chart;
  private employeesNumberChart: Chart;
  private asIsChart: Chart;

  newlyIdentifiedOrphansValue: number;
  financingAmountValue: number;
  squareNormValue: number;
  pricePerSquareMeterValue: number;

  region: Region;
  regionData: RegionStatistics[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MetricsDialogComponent,
    private chartService: ChartService,
    public firebaseService: FirebaseService
  ) {
  }

  @ViewChild('dynamicChart', {static: true}) dynamicChart: BaseChartDirective;

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

      this.regionData.forEach((value, index) => {
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
    });

    this.firebaseService.getById(Collections.COEFFICIENT, this.region.id).subscribe(data => {
      this.metricCoefficients = data as MetricCoefficients;

      this.asIsChart = new Chart([
        {
          data: this.asIsData(this.metricCoefficients),
          label: 'Число детей-сирот, стоящих в очереди'
        }
      ], 2020, 2044);
    });
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

  onChangeValue($event: any) {
  }

  private asIsData(metricCoefficients: MetricCoefficients) {
    const orphansNeedHousingNegative = this.orphansNeedHousingNegative;
    const newlyIdentifiedOrphans = this.newlyIdentifiedOrphans;
    const apartmentsNumberIssued = this.apartmentsNumberIssued;

    const year2020Index = 4;
    const year2030Index = 14;
    const year2044Index = 28;

    for (let i = year2030Index; i <= year2044Index; i++) {
      orphansNeedHousingNegative.push(Math.round(orphansNeedHousingNegative[i] * metricCoefficients.orphansNeedHousingNegativeCoefficient));
      newlyIdentifiedOrphans.push(Math.round((newlyIdentifiedOrphans[i] as number) * metricCoefficients.newlyIdentifiedOrphansCoefficient));
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

    return orphansNumber;
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Collections, MetricCoefficients, Region, RegionStatistics} from '../../core/models';
import {ApiService, FirebaseService} from '../../core/services';
import {MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.scss']
})
export class AddDataDialogComponent implements OnInit {
  regions: Region[];

  regionIdControl: FormControl;
  addRegionDataForm: FormGroup;
  addCoefficientsForm: FormGroup;

  selectedRegionId: string;

  regionDataColumns: string[];
  coefficientDataColumns: string[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  regionDataDataSource: MatTableDataSource<RegionStatistics>;

  coefficientsDataDataSource: MatTableDataSource<MetricCoefficients>;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit() {
    this.apiService.get('regions.json').subscribe(data => {
      this.regions = data;
    });

    this.regionIdControl = new FormControl('RU-PRI');
    this.addRegionDataForm = this.formBuilder.group({
      year: ['', Validators.compose([Validators.required, Validators.min(2016), Validators.max(2030)])],

      orphansInSubject: ['', Validators.compose([Validators.required, Validators.min(0)])],
      newlyIdentifiedOrphans: ['', Validators.compose([Validators.required, Validators.min(0)])],

      orphansNeedHousingNegative: ['', Validators.compose([Validators.required, Validators.min(0)])],
      orphansNeedHousingPositive: ['', Validators.compose([Validators.required, Validators.min(0)])],

      apartmentsNumberIssued: ['', Validators.compose([Validators.required, Validators.min(0)])],

      regionalFunding: ['', Validators.compose([Validators.required, Validators.min(0)])],
      federalFunding: ['', Validators.compose([Validators.required, Validators.min(0)])],

      realHousingCost: ['', Validators.compose([Validators.required, Validators.min(0)])],
      minstroyHousingCost: ['', Validators.compose([Validators.required, Validators.min(0)])],

      employeesNumber: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });
    this.addCoefficientsForm = this.formBuilder.group({
      orphansInSubjectCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],
      newlyIdentifiedOrphansCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],

      orphansNeedHousingNegativeCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],
      orphansNeedHousingPositiveCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],

      apartmentsNumberIssuedCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],

      regionalFundingCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],
      federalFundingCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],

      realHousingCostCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],
      minstroyHousingCostCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])],

      squareNorm: ['', Validators.compose([Validators.required, Validators.min(1)])],

      employeesNumberCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });

    this.selectedRegionId = this.regionIdControl.value;

    this.regionDataColumns = [
      'year',

      'orphansInSubject',
      'newlyIdentifiedOrphans',

      'orphansNeedHousingNegative',
      'orphansNeedHousingPositive',

      'apartmentsNumberIssued',

      'regionalFunding',
      'federalFunding',

      'realHousingCost',
      'minstroyHousingCost',

      'employeesNumber',

      'actions'
    ];
    this.coefficientDataColumns = [
      'orphansInSubjectCoefficient',
      'newlyIdentifiedOrphansCoefficient',

      'orphansNeedHousingNegativeCoefficient',
      'orphansNeedHousingPositiveCoefficient',

      'apartmentsNumberIssuedCoefficient',

      'regionalFundingCoefficient',
      'federalFundingCoefficient',

      'realHousingCostCoefficient',
      'minstroyHousingCostCoefficient',

      'employeesNumberCoefficient',

      'squareNorm',

      'actions'
    ];

    this.regionDataDataSource = new MatTableDataSource([]);
    this.coefficientsDataDataSource = new MatTableDataSource([]);

    this.loadData(this.selectedRegionId);
  }

  onSubmitRegionDataForm(collection: string, id: number, regionStatistics: RegionStatistics) {
    this.firebaseService.store(collection, id.toString(), regionStatistics);
    this.addRegionDataForm.reset();
  }

  onSubmitCoefficientsForm(id: string, coefficients: MetricCoefficients) {
    this.firebaseService.store(Collections.COEFFICIENT, id, coefficients);
    this.addCoefficientsForm.reset();
  }

  onDeleteRegionData(collection: string, id: number) {
    this.firebaseService.delete(collection, id.toString());
  }

  onDeleteCoefficients(id: number) {
    this.firebaseService.delete(Collections.COEFFICIENT, id.toString());
  }

  loadData(selectedRegionId: string) {
    this.firebaseService.get(selectedRegionId).subscribe(data => {
      this.regionDataDataSource = new MatTableDataSource<RegionStatistics>(data as RegionStatistics[]);
      this.regionDataDataSource.paginator = this.paginator;
    });

    this.firebaseService.getById(Collections.COEFFICIENT, selectedRegionId).subscribe(data => {
      this.coefficientsDataDataSource = new MatTableDataSource<MetricCoefficients>(data === undefined ? [] : [data as MetricCoefficients]);
    });
  }

  isDataEmpty() {
    return this.coefficientsDataDataSource.data.length === 0;
  }
}

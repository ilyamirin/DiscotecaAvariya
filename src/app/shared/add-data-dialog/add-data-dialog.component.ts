import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CoefficientsData, Collections, MetricCoefficients, Region, RegionData, RegionStatistics} from '../../core/models';
import {ApiService, FirebaseService} from '../../core/services';
import {Observable} from 'rxjs';


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

  regionDataColumns: string[];
  coefficientDataColumns: string[];

  regionDataDataSource: Observable<any>;
  coefficientsDataDataSource: Observable<any>;

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

      employeesNumberCoefficient: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });

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
      'actions'
    ];
  }

  onSubmitRegionDataForm(id: string, regionStatistics: RegionStatistics) {
    const regionData: RegionData = {
      id,
      data: regionStatistics
    };

    this.firebaseService.store(Collections.REGION_DATA, regionData);
    this.addCoefficientsForm.reset();
  }

  onSubmitCoefficientsForm(id: string, coefficients: MetricCoefficients) {
    const coefficientsData: CoefficientsData = {
      id,
      coefficients
    };

    this.firebaseService.store(Collections.COEFFICIENT, coefficientsData);
    this.addCoefficientsForm.reset();
  }
}

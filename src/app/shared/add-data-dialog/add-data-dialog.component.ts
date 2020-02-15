import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {OrphansStatistics, Region} from '../../core/models';
import {ApiService, FirebaseService} from '../../core/services';


@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.scss']
})
export class AddDataDialogComponent implements OnInit {

  orphansStatistics: OrphansStatistics;

  regions: Region[];
  filteredRegions: Observable<Region[]>;
  autocompleteControl = new FormControl();

  addRegionDataForm: FormGroup;
  addCoefficientsForm: FormGroup;

  regionDataColumns: string[] = [
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
  coefficientDataColumns: string[] = [
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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit() {
    this.orphansStatistics = new OrphansStatistics();

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

    this.apiService.get('regions.json').subscribe(data => {
      this.regions = data;
    });

    this.filteredRegions = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        debounceTime(500),
        map(name => name ? this._filter(name) : this.regions.slice())
      );
  }

  displayFn(region: Region): string {
    return region && region.name ? region.name : '';
  }

  onSubmitRegionDataForm(formValue: FormGroup) {
    // this.firebaseService.store(Collections.REGIONS, formValue.value);
    console.log(formValue.value);
  }

  onSubmitCoefficientsForm(formValue: FormGroup) {
    console.log(formValue.value);
  }

  private _filter(name: string): Region[] {
    const filterValue = name.toLowerCase();

    return this.regions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}

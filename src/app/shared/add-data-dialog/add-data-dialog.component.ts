import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Region} from '../../core/models';
import {ApiService} from '../../core/services';
import {OrphansStatistics} from '../../core/models/orphans-statistics.model';


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

  addDataForm: FormGroup;

  displayedColumns: string[] = [
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

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.orphansStatistics = new OrphansStatistics();

    this.addDataForm = this.formBuilder.group({
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

  onSubmitAuthForm(formValue: FormGroup) {
    console.log(formValue.value);
  }

  private _filter(name: string): Region[] {
    const filterValue = name.toLowerCase();

    return this.regions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}

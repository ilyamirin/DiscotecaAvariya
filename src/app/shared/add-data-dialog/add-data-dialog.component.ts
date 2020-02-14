import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Region} from '../../core/models';
import {ApiService} from '../../core/services';


@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.scss']
})
export class AddDataDialogComponent implements OnInit {

  regions: Region[];
  filteredRegions: Observable<Region[]>;
  myControl = new FormControl();

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
    private apiService: ApiService
  ) {
    this.apiService.get('regions.json').subscribe(data => {
      this.regions = data;
    });
  }

  ngOnInit() {
    this.filteredRegions = this.myControl.valueChanges
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

  private _filter(name: string): Region[] {
    const filterValue = name.toLowerCase();

    return this.regions.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}

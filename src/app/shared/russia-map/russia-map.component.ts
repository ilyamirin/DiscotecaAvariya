import {Component, OnInit} from '@angular/core';
import {Region} from '../../core/models';
import {ApiService} from '../../core/service';


@Component({
  selector: 'app-russia-map',
  templateUrl: './russia-map.component.html',
  styleUrls: ['./russia-map.component.scss']
})
export class RussiaMapComponent implements OnInit {

  regions: Region[];

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.apiService.get('regions.json').subscribe(data => {
      this.regions = data;
    });
  }

}

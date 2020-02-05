import {Component, OnInit} from '@angular/core';
import {Region} from '../../core/models';
import {ApiService, DialogService} from '../../core/service';
import {MetricsDialogComponent} from '../metrics-dialog/metrics-dialog.component';


@Component({
  selector: 'app-russia-map',
  templateUrl: './russia-map.component.html',
  styleUrls: ['./russia-map.component.scss']
})
export class RussiaMapComponent implements OnInit {

  regions: Region[];

  constructor(
    private apiService: ApiService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.apiService.get('regions.json').subscribe(data => {
      this.regions = data;
      this.setOpenDialogAction(this.regions);
    });
  }

  openMetricsDialog(region: Region) {
    const dialogRef = this.dialogService.open(MetricsDialogComponent, {
      data: {
        region
      }
    });
  }

  private setOpenDialogAction(regions) {
    regions.forEach(region => {
      document.getElementById(region.code).onclick = () => {
        this.openMetricsDialog(region);
      };
    });
  }

}

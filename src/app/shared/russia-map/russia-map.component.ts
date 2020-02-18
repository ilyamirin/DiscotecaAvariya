import {Component, OnInit} from '@angular/core';
import {Region} from '../../core/models';
import {ApiService, DialogService} from '../../core/services';
import {MetricsDialogComponent} from '../metrics-dialog/metrics-dialog.component';
import {RegionStatus} from '../../core/models';


@Component({
  selector: 'app-russia-map',
  templateUrl: './russia-map.component.html',
  styleUrls: ['./russia-map.component.scss']
})
export class RussiaMapComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.apiService.get('regions.json').subscribe(data => {
      this.setOpenDialogAction(data as Region[]);
    });
  }

  private setOpenDialogAction(regions) {
    regions.forEach(region => {
      document.getElementById(region.id).onclick = () => {
        this.openMetricsDialog(region);
      };
    });
  }

  openMetricsDialog(region: Region) {
    const regionStatus: RegionStatus = RegionStatus.UNKNOWN;

    const dialogRef = this.dialogService.open(MetricsDialogComponent, {
      width: '1200px',
      height: '640px',
      hasBackdrop: false,
      data: {
        region,
        regionStatus
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      document.getElementById(region.id).style.fill = res.regionStatus;
    });
  }
}

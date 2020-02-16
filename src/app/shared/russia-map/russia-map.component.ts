import {Component, OnInit} from '@angular/core';
import {Collections, Region} from '../../core/models';
import {ApiService, DialogService, FirebaseService} from '../../core/services';
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
    private dialogService: DialogService,
    private firebaseService: FirebaseService
  ) {
  }

  ngOnInit() {
    this.apiService.get('regions.json').subscribe(data => {
      this.regions = data;
      this.setOpenDialogAction(this.regions);
    });

    /*this.firebaseService.get(Collections.REGION).subscribe(data => {
      this.regions = data as Region[];
      this.setOpenDialogAction(this.regions);
    });*/
  }

  private setOpenDialogAction(regions) {
    regions.forEach(region => {
      document.getElementById(region.id).onclick = () => {
        const regionPrimorskyKrai = 'RU-PRI';

        if (region.id === regionPrimorskyKrai) {
          this.openMetricsDialog(region);
        }
      };
    });
  }

  test($event) {
    console.log($event.currentTarget.id);
  }

  openMetricsDialog(region: Region) {
    const dialogRef = this.dialogService.open(MetricsDialogComponent, {
      width: '1200px',
      height: '640px',
      data: {
        region
      }
    });
  }
}

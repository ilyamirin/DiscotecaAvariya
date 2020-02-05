import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Region} from '../../core/models';


@Component({
  selector: 'app-metrics-dialog',
  templateUrl: './metrics-dialog.component.html',
  styleUrls: ['./metrics-dialog.component.scss']
})
export class MetricsDialogComponent implements OnInit {

  region: Region;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: MetricsDialogComponent,
    private dialogRef: MatDialogRef<MetricsDialogComponent>
  ) {
  }

  ngOnInit() {
    this.region = this.data.region;
  }

}

import {Component, OnInit} from '@angular/core';
import {DialogService} from '../../core/service';
import {InsertParamsDialogComponent} from '../insert-params-dialog/insert-params-dialog.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  displayedColumns: string[] = [
    'A',
    'B',
    'C',
    'D',
    'actions'
  ];

  constructor(
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
  }

  openInsertParamsDialog() {
    const dialogRef = this.dialogService.open(InsertParamsDialogComponent, {
      data: {}
    });
  }

}

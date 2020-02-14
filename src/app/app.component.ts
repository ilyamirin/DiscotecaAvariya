import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DialogService, ThemeService} from './core/services';
import {AddDataDialogComponent} from './shared/add-data-dialog/add-data-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
  }

  openAddDataDialog() {
    const dialogRef = this.dialogService.open(AddDataDialogComponent, {
      width: '1360px',
      height: '640px',
      data: {}
    });
  }
}

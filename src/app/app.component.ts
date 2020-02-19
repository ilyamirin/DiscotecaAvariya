import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService, DialogService, ThemeService} from './core/services';
import {AddDataDialogComponent} from './shared/add-data-dialog/add-data-dialog.component';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLightTheme: Observable<boolean>;
  private uid: string;
  private readonly adminUid: string = '7ws5bz2dtzR9tZhlcn6aKXbwU1z1';
  private readonly AlexeyUid: string = '7QvwaOJvcWav9PVzUJ5vlpcQz0o1';

  constructor(
    private themeService: ThemeService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
    this.authService.user.subscribe(data => {
      if (data !== null) {
        this.uid = data.uid;
      }
    });
  }

  openAddDataDialog(user) {
    if (this.hasWriteAccess(user)) {
      this.dialogService.open(AddDataDialogComponent, {
        hasBackdrop: false,
        width: '1360px',
        height: '640px'
      });
    } else {
      this.accessDenied();
    }
  }

  private accessDenied() {
    this.snackBar.open('У вас нет доступа для редактирования', '', {
      duration: 3000
    });
  }

  private hasWriteAccess(user) {
    return user.uid === this.adminUid || this.uid === this.AlexeyUid;
  }
}

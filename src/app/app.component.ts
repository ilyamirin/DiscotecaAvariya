import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ThemeService} from './core/service/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthService, ThemeService} from '../../core/services';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLightTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLightTheme = this.themeService.isLightTheme;
  }

  toggleLightTheme(checked: boolean) {
    this.themeService.setLightTheme(checked);
  }
}

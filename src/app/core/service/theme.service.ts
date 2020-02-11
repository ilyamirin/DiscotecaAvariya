import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private lightTheme: Subject<boolean> = new Subject<boolean>();

  isLightTheme = this.lightTheme.asObservable();

  constructor() {
  }

  setLightTheme(isLightTheme: boolean) {
    this.lightTheme.next(isLightTheme);
  }
}

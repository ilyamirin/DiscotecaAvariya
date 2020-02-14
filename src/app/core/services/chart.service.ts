import {Injectable} from '@angular/core';
import {Label} from 'ng2-charts';


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() {
  }

  generateChartLabels(startYear: number, endYear: number) {
    const lineChartLabels: Label[] = [];

    for (let i = startYear; i <= endYear; i++) {
      lineChartLabels.push(i.toString());
    }

    return lineChartLabels;
  }
}

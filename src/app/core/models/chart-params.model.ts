import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';


export interface ChartParams {
  lineChartLabels: Label[];
  lineChartData: ChartDataSets[];
  lineChartOptions: (ChartOptions & { annotation: any });
  lineChartColors: Color[];
}

import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';


export interface ChartParams {
  chartLabels: Label[];
  chartData: ChartDataSets[];
  chartOptions: (ChartOptions & { annotation: any });
  chartColors: Color[];
}

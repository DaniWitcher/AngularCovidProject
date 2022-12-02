import { ThisReceiver } from '@angular/compiler';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { from } from 'rxjs';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnChanges {
  // @Input()  public cStat : Statistics;
  // @Input()  public sStat : Statistics;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() public stats: Statistics[];

  // Radar
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [
    'New',
    'Total Cases',
    'Active',
    'Recovered',
    'Deaths',
    'Tests',
  ];
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
      {
        data: [],
        label: '',
      },
    ],
  };
  public radarChartType: ChartConfiguration<'radar'>['type'] = 'radar';

  constructor() {
    setInterval(() => {
      for (let i = 0; i < this.stats.length; i++) {
        this.radarChartData.datasets[i].data = [
          this.stats[i].newCases % 100,
          this.stats[i].totalCases % 100,
          this.stats[i].active % 100,
          this.stats[i].recovered % 100,
          this.stats[i].deaths % 100,
          this.stats[i].tests % 100,
        ];
        this.radarChartData.datasets[i].label = this.stats[i].name;
      }

      for (let i = this.stats.length; i < 10; i++) {
        this.radarChartData.datasets[i].data = [
        ];
        this.radarChartData.datasets[i].label = '';
      }
      this.chart?.update();
    }, 1000);
  }
  ngOnChanges(changes: SimpleChanges): void {}
}

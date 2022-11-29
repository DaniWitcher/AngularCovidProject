import { ThisReceiver } from '@angular/compiler';
import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent} from 'chart.js';
import {Statistics} from "../../models/statistics";

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: [ './radar-chart.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadarChartComponent implements OnChanges{

  @Input()  public cStat : Statistics[];
  @Input()  public sStat : Statistics[];

  // Radar
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [ 'New', 'Total Cases', 'Active', 'Recovered', 'Deaths', 'Tests'];
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: []
  };
  public radarChartType: ChartConfiguration<'radar'>['type'] = 'radar';

  ngOnChanges(changes: SimpleChanges): void {
      this.radarChartData = {
        labels: this.radarChartLabels,
        datasets: [
          { data: [
            this.cStat[0].newCases%100,
            this.cStat[0].totalCases%100,
            this.cStat[0].active%100,
            this.cStat[0].recovered%100,
            this.cStat[0].deaths%100,
            this.cStat[0].tests%100
            ],
            label: this.cStat[0].name
          },
          { data: [
            this.sStat[0].newCases%100,
            this.sStat[0].totalCases%100,
            this.sStat[0].active%100,
            this.sStat[0].recovered%100,
            this.sStat[0].deaths%100,
            this.sStat[0].tests%100
            ],
            label: this.sStat[0].name
          }
        ]
      };
  }
}

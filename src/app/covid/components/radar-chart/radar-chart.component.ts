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

  @Input()  public cStat : Statistics;
  @Input()  public sStat : Statistics;

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
            this.cStat.newCases%100,
            this.cStat.totalCases%100,
            this.cStat.active%100,
            this.cStat.recovered%100,
            this.cStat.deaths%100,
            this.cStat.tests%100
            ],
            label: this.cStat.name
          },
          { data: [
            this.sStat.newCases%100,
            this.sStat.totalCases%100,
            this.sStat.active%100,
            this.sStat.recovered%100,
            this.sStat.deaths%100,
            this.sStat.tests%100
            ],
            label: this.sStat.name
          }
        ]
      };
  }
}

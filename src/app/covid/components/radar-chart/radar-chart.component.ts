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
import { from, max, retry } from 'rxjs';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() public stats: Statistics[];
  @Input() public allStats: Statistics[];
  public maxStats: Statistics;

  // Radar
  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [
    'Total Cases',
    'Active',
    'Recovered',
    'Deaths',
    'Tests',
  ];
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [],
  };
  public radarChartType: ChartConfiguration<'radar'>['type'] = 'radar';

  constructor() {
    setTimeout(() => {
      this.maxStats = this.getMaxNumbers(this.allStats);
      setInterval(() => {
        if (this.stats.length > this.radarChartData.datasets.length) {
          for (let i = 0; i < this.radarChartData.datasets.length; i++) {
            this.radarChartData.datasets[i].data = [
              (this.stats[i].totalCases / this.maxStats.totalCases) * 100,
              (this.stats[i].active / this.maxStats.active) * 100,
              (this.stats[i].recovered / this.maxStats.recovered) * 100,
              (this.stats[i].deaths / this.maxStats.deaths) * 100,
              (this.stats[i].tests / this.maxStats.tests) * 100,
            ];
            this.radarChartData.datasets[i].label = this.stats[i].name;
          }
  
          for (
            let i = this.radarChartData.datasets.length;
            i < this.stats.length;
            i++
          ) {
            this.radarChartData.datasets.push({
              data: [
                (this.stats[i].totalCases / this.maxStats.totalCases) * 100,
                (this.stats[i].active / this.maxStats.active) * 100,
                (this.stats[i].recovered / this.maxStats.recovered) * 100,
                (this.stats[i].deaths / this.maxStats.deaths) * 100,
                (this.stats[i].tests / this.maxStats.tests) * 100,
              ],
              label: this.stats[i].name,
            });
          }
        } else if (this.stats.length < this.radarChartData.datasets.length){
          
          for (
            let i = 0;
            i <= this.radarChartData.datasets.length;
            i++
          ) {
            this.radarChartData.datasets.pop();
          }
        }
        this.chart?.update();
      }, 50);
    },3000);
    
    
  }
  ngOnChanges(changes: SimpleChanges): void {}

  getMaxNumbers(statsArray: Statistics[]): Statistics {
    let maxStats: Statistics = {
      newCases: statsArray[0].newCases,
      totalCases: statsArray[0].totalCases,
      active: statsArray[0].active,
      recovered: statsArray[0].recovered,
      deaths: statsArray[0].deaths,
      tests: statsArray[0].tests,
    };
    for (let i = 1; i < statsArray.length; i++) {
      if (statsArray[i].newCases > maxStats.newCases) {
        maxStats.newCases = statsArray[i].newCases;
      }
      if (statsArray[i].totalCases > maxStats.totalCases) {
        maxStats.totalCases = statsArray[i].totalCases;
      }
      if (statsArray[i].active > maxStats.active) {
        maxStats.active = statsArray[i].active;
      }
      if (statsArray[i].recovered > maxStats.recovered) {
        maxStats.recovered = statsArray[i].recovered;
      }
      if (statsArray[i].deaths > maxStats.deaths) {
        maxStats.deaths = statsArray[i].deaths;
      }
      if (statsArray[i].tests > maxStats.tests) {
        maxStats.tests = statsArray[i].tests;
      }
    }

    return maxStats;
  }
}

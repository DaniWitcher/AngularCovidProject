import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnChanges, OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input()
  countriesStat: Statistics[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [
      'Tests',
      'Total Cases',
      'Active',
      'Recovered',
      'Deaths',
      'New Cases',
    ],
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
    ],
  };

  ngOnInit() {}

  ngOnChanges() {
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        this.barChartData.datasets[i].data = [
          this.countriesStat[i].tests % 100,
          this.countriesStat[i].totalCases % 100,
          this.countriesStat[i].active % 100,
          this.countriesStat[i].recovered % 100,
          this.countriesStat[i].deaths % 100,
          this.countriesStat[i].newCases % 100,
        ];
        this.barChartData.datasets[i].label = this.countriesStat[i].name;
      }
      this.chart?.update();
    },3000);
  }
  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}

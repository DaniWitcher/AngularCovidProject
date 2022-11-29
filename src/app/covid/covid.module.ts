import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import {NgChartsModule} from "ng2-charts";
import { CountryComponent } from './components/country/country.component';
import {FormsModule} from "@angular/forms";
import {CountriesService} from "./services/countries/countries.service";
import {StatisticsService} from "./services/statistics/statistics.service";

@NgModule({
  declarations: [
    RadarChartComponent,
    CountryComponent,
  ],
  exports: [
    RadarChartComponent
  ],
  providers :[CountriesService,StatisticsService],
  imports: [
        CommonModule,
        NgChartsModule,
        FormsModule,
    ]
})
export class CovidModule { }

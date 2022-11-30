import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import {NgChartsModule} from "ng2-charts";
import { CountryComponent } from './components/country/country.component';
import {FormsModule} from "@angular/forms";
import {StatisticsService} from "./services/statistics/statistics.service";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllCountriesComponent } from './components/all-countries/all-countries.component';

@NgModule({
  declarations: [
    RadarChartComponent,
    CountryComponent,
    HeaderComponent,
    FooterComponent,
    AllCountriesComponent,
  ],
  exports: [
    RadarChartComponent,
    HeaderComponent,
    FooterComponent,
    AllCountriesComponent
  ],
  providers :[StatisticsService],
  imports: [
        CommonModule,
        NgChartsModule,
        FormsModule,
    ]
})
export class CovidModule { }

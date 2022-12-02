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
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ContentComponent } from './components/content/content.component';
import { CountriesArrayService } from './services/countries-array.service';

@NgModule({
  declarations: [
    RadarChartComponent,
    CountryComponent,
    HeaderComponent,
    FooterComponent,
    AllCountriesComponent,
    SidePanelComponent,
    BarChartComponent,
    ContentComponent,
  ],
  exports: [
    RadarChartComponent,
    HeaderComponent,
    FooterComponent,
    AllCountriesComponent,
    SidePanelComponent,
    BarChartComponent,
    ContentComponent
  ],
  providers :[StatisticsService,CountriesArrayService],
  imports: [
        CommonModule,
        NgChartsModule,
        FormsModule,
    ]
})
export class CovidModule { }

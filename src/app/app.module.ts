import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import {CovidModule} from "./covid/covid.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CountriesService} from "./covid/services/countries/countries.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule,
    CovidModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

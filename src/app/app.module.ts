import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import {CovidModule} from "./covid/covid.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        NgChartsModule,
        FormsModule,
        HttpClientModule,
        CovidModule,
    ]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Country} from "../../models/country";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Statistics} from "../../models/statistics";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  public statistics$: BehaviorSubject<Statistics[]> = new BehaviorSubject<Statistics[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getStatistics(countryName:string): Observable<Statistics[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '6507f434e3mshb802c99a200b5bbp16ae32jsn69c628e1f5c3',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
    });

    return this.httpClient
      .get<Statistics[]>('https://covid-193.p.rapidapi.com/statistics?country=' + countryName, {
        headers: httpHeaders,
      })
      .pipe(
        map((json: any) => {
          return (json.response)
          .map((countryJson: any) => {
            return {
              population: countryJson.population,
              tests: countryJson.tests.total,
              totalCases: countryJson.cases.total,
              active: countryJson.cases.active,
              recovered: countryJson.cases.recovered,
              deaths: countryJson.deaths.total,
              newCases: Number((countryJson.cases.new))
            };
         });
        })
      );
  }
}

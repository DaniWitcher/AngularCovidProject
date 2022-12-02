import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Country} from "../../models/country";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Statistics} from "../../models/statistics";
import { WholeStat } from '../../models/wholeStat';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  //public statistics$: BehaviorSubject<Statistics[]> = new BehaviorSubject<Statistics[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getStatistics(): Observable<Statistics[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '6507f434e3mshb802c99a200b5bbp16ae32jsn69c628e1f5c3',
      'X-RapidAPI-Host': 'corona-virus-world-and-india-data.p.rapidapi.com',
    });

    return this.httpClient
      .get<Statistics[]>('https://corona-virus-world-and-india-data.p.rapidapi.com/api', {
        headers: httpHeaders,
      })
      .pipe(
        map((json: any) => {
          return (json.countries_stat)
          .map((countryJson: any) => {
            return {
              name : countryJson.country_name,
              tests: Number((countryJson.total_tests).split(',').join('')),
              totalCases: Number(countryJson.cases.split(',').join('')),
              active: Number(countryJson.active_cases.split(',').join('')),
              recovered: Number(countryJson.total_recovered.split(',').join('')),
              deaths: Number(countryJson.deaths.split(',').join('')),
              newCases: Number((countryJson.new_cases).split(',').join(''))
            };
         });
        })
      );
  }

  public getWholeStat(): Observable<WholeStat>{
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '6507f434e3mshb802c99a200b5bbp16ae32jsn69c628e1f5c3',
      'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com',
    });

    return this.httpClient
      .get<WholeStat>('https://covid-19-statistics.p.rapidapi.com/reports/total?date=2022-01-01', {
        headers: httpHeaders,
      })
      .pipe(
        map((json: any) => {
          return {
            totalCases: json.data.confirmed,
            totalDeaths: json.data.deaths
          }
        })
      );
  }
}

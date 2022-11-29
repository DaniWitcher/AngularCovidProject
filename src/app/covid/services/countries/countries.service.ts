import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Country } from '../../models/country';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CountriesService {
  public countries$: BehaviorSubject<Country[]> = new BehaviorSubject<
    Country[]
    >([]);

  constructor(private httpClient: HttpClient) {}

  public getCountries(): Observable<Country[]> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '6507f434e3mshb802c99a200b5bbp16ae32jsn69c628e1f5c3',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
    });

    return this.httpClient
      .get<Country[]>('https://covid-193.p.rapidapi.com/countries', {
        headers: httpHeaders,
      })
      .pipe(
        map((json: any) => {
          return (json.response || []).map((countryJson: any) => {
            return {
              name: countryJson
            };
          });
        })
      );
  }
}

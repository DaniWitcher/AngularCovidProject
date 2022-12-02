import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class CountriesArrayService {
  public countriesArray$ = new Subject<Statistics>();

  public addStat(stat: Statistics){
    this.countriesArray$.next(stat);
  }
}

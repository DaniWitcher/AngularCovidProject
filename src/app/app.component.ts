import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Country } from './covid/models/country';
import { CountriesService } from './covid/services/countries/countries.service';
import { delay, Subject, takeUntil } from 'rxjs';
import { StatisticsService } from './covid/services/statistics/statistics.service';
import { Statistics } from './covid/models/statistics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public countries: Country[] = [];
  public firstCountry: string = 'FirstCountry';
  public secondCountry: string = 'SecondCountry';
  public countryStat: Statistics[] =[{
    name: 'FirstCountry',
    population : 0,
    tests : 0,
    totalCases : 0,
    active : 0,
    recovered : 0,
    deaths : 0,
    newCases : 0
  }];

  public secondCountryStat: Statistics[] =[{
    name: 'SecondCountry',
    population : 0,
    tests : 0,
    totalCases : 0,
    active : 0,
    recovered : 0,
    deaths : 0,
    newCases : 0
  }];

  constructor(
    private countriesService: CountriesService,
    private changeDetectionRef: ChangeDetectorRef,
    private staticService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.countriesService
      .getCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe((countries) => {
        this.countries = countries;
        this.changeDetectionRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCountryStat() {
    this.staticService
      .getStatistics(this.firstCountry)
      .pipe(takeUntil(this.destroy$))
      .subscribe((stat) => {
        this.countryStat = stat;
        this.countryStat[0].name = this.firstCountry;
        this.changeDetectionRef.markForCheck();
      });
  }

  getSecondCountryStat() {
    this.staticService
      .getStatistics(this.secondCountry)
      .pipe(takeUntil(this.destroy$))
      .subscribe((stat) => {
        this.secondCountryStat = stat;
        this.secondCountryStat[0].name = this.secondCountry;
        this.changeDetectionRef.markForCheck();
      });
  }

  showCountryStat() {
    console.log('Wait please, scanning data');
    setTimeout(() => {
      console.log(this.countryStat);
    }, 5000);
  }
}

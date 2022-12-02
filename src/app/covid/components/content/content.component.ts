import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { count, Subject, takeUntil } from 'rxjs';
import { Country } from '../../models/country';
import { Statistics } from '../../models/statistics';
import { CountriesArrayService } from '../../services/countries-array.service';
import { StatisticsService } from '../../services/statistics/statistics.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public countries: Country[] = [];
  public firstCountry: string = 'FirstCountry';
  public secondCountry: string = 'SecondCountry';
  public countryStat: Statistics = {
    name: 'FirstCountry',
    tests: 0,
    totalCases: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
    newCases: 0,
  };

  public secondCountryStat: Statistics = {
    name: 'SecondCountry',
    tests: 0,
    totalCases: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
    newCases: 0,
  };

  public allCountriesStat: Statistics[] = [];

  public showCountriesStat: Statistics[] = [];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private staticService: StatisticsService,
    private countryService: CountriesArrayService
  ) {
    setInterval(() => {
      this.countryService.countriesArray$.subscribe((stat) => {
        if(!this.showCountriesStat.includes(stat) && this.showCountriesStat.length < 10){
          this.showCountriesStat.push(stat);
        }   
      });
    }, 3000);
  }

  ngOnInit(): void {
    this.getAllCountriesStat();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllCountriesStat() {
    this.staticService
      .getStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((stat) => {
        this.allCountriesStat = stat;
        this.countries = stat.map(this.getCountry);
      });
  }

  getCountry(item: any) {
    return {
      name: item.name,
    };
  }

  getCountryStat(countryName: String, isFirst: boolean) {
    if (isFirst) {
      this.countryStat = this.allCountriesStat.filter(
        (c) => c.name == countryName
      )[0];
    } else {
      this.secondCountryStat = this.allCountriesStat.filter(
        (c) => c.name == countryName
      )[0];
    }
    this.changeDetectionRef.markForCheck();
  }

  deleteCountryStat(country: Statistics){
    this.showCountriesStat = this.showCountriesStat.filter((stat) => stat.name !== country.name);
  }
}

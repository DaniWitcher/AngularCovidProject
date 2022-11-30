import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Country } from './covid/models/country';
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
  public isLoaded = false;
  private destroy$: Subject<void> = new Subject<void>();
  public countries: Country[] = [];
  public firstCountry: string = 'FirstCountry';
  public secondCountry: string = 'SecondCountry';
  public countryStat: Statistics = {
    name: 'FirstCountry',
    tests : 0,
    totalCases : 0,
    active : 0,
    recovered : 0,
    deaths : 0,
    newCases : 0
  };

  public secondCountryStat: Statistics = {
    name: 'SecondCountry',
    tests : 0,
    totalCases : 0,
    active : 0,
    recovered : 0,
    deaths : 0,
    newCases : 0
  };

  public allCountriesStat: Statistics[] =[];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private staticService: StatisticsService
  ) {}

  ngOnInit(): void {   
      this.getAllCountriesStat();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllCountriesStat(){
    this.staticService
      .getStatistics()
      .pipe(takeUntil(this.destroy$))
      .subscribe((stat) => {
        this.allCountriesStat = stat;
        this.countries = stat.map(this.getCountry)
      });   
  }

  getCountry(item : any){
    return {
      name: item.name
    }
  }

  getCountryStat(countryName : String, isFirst: boolean){
    if(isFirst){
      this.countryStat = this.allCountriesStat.filter((c) => c.name == countryName)[0];
    }else{
      this.secondCountryStat = this.allCountriesStat.filter((c) => c.name == countryName)[0];
    }
      this.changeDetectionRef.markForCheck();
  }

  loadingTimeout(){
    setTimeout(() => {
      this.isLoaded = true;
      this.changeDetectionRef.markForCheck();
    },1000);
  }
}

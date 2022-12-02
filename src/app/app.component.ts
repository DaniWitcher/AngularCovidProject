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
})
export class AppComponent implements OnInit{
  public isLoaded = false;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {   
    this.changeDetectionRef.markForCheck();
  }

  loadingTimeout(){
    setTimeout(() => {
      this.isLoaded = true;
      this.changeDetectionRef.markForCheck();
    },100);
  }
}

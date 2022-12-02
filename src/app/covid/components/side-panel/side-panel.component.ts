import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WholeStat } from '../../models/wholeStat';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { delay, Subject, takeUntil } from 'rxjs';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent implements OnInit,OnDestroy{

  @Input()
  countriesStat: Statistics[];

  public worldStat: WholeStat = {
    totalCases: 0,
    totalDeaths: 0,
  };
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private staticService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.getWorldStat();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getWorldStat(){
    this.staticService
      .getWholeStat()
      .pipe(takeUntil(this.destroy$))
      .subscribe((stat) => {
        this.worldStat = stat;
      });   
  }
}

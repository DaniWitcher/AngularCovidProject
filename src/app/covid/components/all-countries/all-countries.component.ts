import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Statistics } from '../../models/statistics';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCountriesComponent implements OnInit{
  @Input()  public countriesStat : Statistics[];


  constructor(private changeDetectionRef: ChangeDetectorRef,){
  }

  ngOnInit(){
    setTimeout(() => {
      this.changeDetectionRef.markForCheck();
    },1000);
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Statistics } from '../../models/statistics';
import { CountriesArrayService } from '../../services/countries-array.service';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.scss'],
})
export class AllCountriesComponent implements OnInit {
  @Input() public countriesStat: Statistics[];

  public countryStat : any;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private readonly countryService: CountriesArrayService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.changeDetectionRef.markForCheck();
    }, 1000);
  }

  sendCountryStat(country : Statistics) {
    this.countryService.addStat(country);
  }
}

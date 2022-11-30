import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent implements OnInit {
  @Input()
  public country: Country;

  @Input()
  public content: TemplateRef<HTMLElement>;

  @Output()
  public countryChange: EventEmitter<Country> = new EventEmitter<Country>();

  @Output()
  public countryRemove: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  @HostListener('click')
  public hostClicked(): void {
  }

  public onCountryRemove(): void {
    this.countryRemove.emit(this.country);
  }

  public onCountryChanged(): void {
    this.countryChange.emit(this.country);
  }
}

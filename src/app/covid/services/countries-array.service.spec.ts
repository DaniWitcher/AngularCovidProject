import { TestBed } from '@angular/core/testing';

import { CountriesArrayService } from './countries-array.service';

describe('CountriesArrayService', () => {
  let service: CountriesArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

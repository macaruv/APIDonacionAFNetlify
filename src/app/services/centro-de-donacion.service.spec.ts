import { TestBed } from '@angular/core/testing';

import { CentroDeDonacionService } from './centro-de-donacion.service';

describe('CentroDeDonacionService', () => {
  let service: CentroDeDonacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroDeDonacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

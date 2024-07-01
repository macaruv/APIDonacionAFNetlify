import { TestBed } from '@angular/core/testing';

import { IntermediarioService } from './intermediario.service';

describe('IntermediarioService', () => {
  let service: IntermediarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntermediarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

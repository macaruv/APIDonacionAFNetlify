import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroDeDonacionFormComponent } from './centro-de-donacion-form.component';

describe('CentroDeDonacionFormComponent', () => {
  let component: CentroDeDonacionFormComponent;
  let fixture: ComponentFixture<CentroDeDonacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroDeDonacionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentroDeDonacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

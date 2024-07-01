import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarioFormComponent } from './beneficiario-form.component';

describe('BeneficiarioFormComponent', () => {
  let component: BeneficiarioFormComponent;
  let fixture: ComponentFixture<BeneficiarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

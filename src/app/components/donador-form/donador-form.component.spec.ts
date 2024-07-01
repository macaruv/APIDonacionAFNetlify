import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonadorFormComponent } from './donador-form.component';

describe('DonadorFormComponent', () => {
  let component: DonadorFormComponent;
  let fixture: ComponentFixture<DonadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonadorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

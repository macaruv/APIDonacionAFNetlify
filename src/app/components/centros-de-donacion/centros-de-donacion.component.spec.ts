import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrosDeDonacionComponent } from './centros-de-donacion.component';

describe('CentrosDeDonacionComponent', () => {
  let component: CentrosDeDonacionComponent;
  let fixture: ComponentFixture<CentrosDeDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentrosDeDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrosDeDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntermediarioFormComponent } from './intermediarios-form.component';

describe('IntermediariosFormComponent', () => {
  let component: IntermediarioFormComponent;
  let fixture: ComponentFixture<IntermediarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntermediarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

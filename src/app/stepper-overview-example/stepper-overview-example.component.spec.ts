import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperOverviewExampleComponent } from './stepper-overview-example.component';

describe('StepperOverviewExampleComponent', () => {
  let component: StepperOverviewExampleComponent;
  let fixture: ComponentFixture<StepperOverviewExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperOverviewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

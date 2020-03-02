import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthboardComponent } from './healthboard.component';

describe('HealthboardComponent', () => {
  let component: HealthboardComponent;
  let fixture: ComponentFixture<HealthboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

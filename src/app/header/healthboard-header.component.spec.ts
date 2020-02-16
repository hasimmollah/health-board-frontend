import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthBoardHeaderComponent } from './healthboard-header.component';

describe('HealthBoardHeaderComponent', () => {
  let component: HealthBoardHeaderComponent;
  let fixture: ComponentFixture<HealthBoardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthBoardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthBoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

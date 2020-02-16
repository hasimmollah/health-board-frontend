import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthBoardFooterComponent } from './healthboard-footer.component';

describe('HealthBoardFooterComponent', () => {
  let component: HealthBoardFooterComponent;
  let fixture: ComponentFixture<HealthBoardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthBoardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthBoardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGamePopupComponent } from './start-game-popup.component';

describe('StartGamePopupComponent', () => {
  let component: StartGamePopupComponent;
  let fixture: ComponentFixture<StartGamePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartGamePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGamePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

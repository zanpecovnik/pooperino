import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnimalBySoundGameComponent } from './find-animal-by-sound-game.component';

describe('FindAnimalBySoundGameComponent', () => {
  let component: FindAnimalBySoundGameComponent;
  let fixture: ComponentFixture<FindAnimalBySoundGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAnimalBySoundGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAnimalBySoundGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

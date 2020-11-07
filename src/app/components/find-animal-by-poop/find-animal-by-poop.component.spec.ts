import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnimalByPoopComponent } from './find-animal-by-poop.component';

describe('FindAnimalByPoopComponent', () => {
  let component: FindAnimalByPoopComponent;
  let fixture: ComponentFixture<FindAnimalByPoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAnimalByPoopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAnimalByPoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

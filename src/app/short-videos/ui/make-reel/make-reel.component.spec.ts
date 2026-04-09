import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeReelComponent } from './make-reel.component';

describe('MakeReelComponent', () => {
  let component: MakeReelComponent;
  let fixture: ComponentFixture<MakeReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeReelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

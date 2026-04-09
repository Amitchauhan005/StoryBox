import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesFaqComponent } from './features-faq.component';

describe('FeaturesFaqComponent', () => {
  let component: FeaturesFaqComponent;
  let fixture: ComponentFixture<FeaturesFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

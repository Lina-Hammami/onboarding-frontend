import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPhotosComponent } from './related-photos.component';

describe('RelatedPhotosComponent', () => {
  let component: RelatedPhotosComponent;
  let fixture: ComponentFixture<RelatedPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedPhotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

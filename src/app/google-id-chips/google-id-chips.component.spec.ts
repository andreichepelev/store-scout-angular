import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleIdChipsComponent } from './google-id-chips.component';

describe('GoogleIdChipsComponent', () => {
  let component: GoogleIdChipsComponent;
  let fixture: ComponentFixture<GoogleIdChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleIdChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleIdChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

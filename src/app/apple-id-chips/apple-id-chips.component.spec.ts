import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleIdChipsComponent } from './apple-id-chips.component';

describe('AppleIdChipsComponent', () => {
  let component: AppleIdChipsComponent;
  let fixture: ComponentFixture<AppleIdChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppleIdChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleIdChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

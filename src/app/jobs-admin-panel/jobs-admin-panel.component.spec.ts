import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAdminPanelComponent } from './jobs-admin-panel.component';

describe('JobsAdminPanelComponent', () => {
  let component: JobsAdminPanelComponent;
  let fixture: ComponentFixture<JobsAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsAdminPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

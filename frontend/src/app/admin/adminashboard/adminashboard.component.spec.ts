import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminashboardComponent } from './adminashboard.component';

describe('AdminashboardComponent', () => {
  let component: AdminashboardComponent;
  let fixture: ComponentFixture<AdminashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

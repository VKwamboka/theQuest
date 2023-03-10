import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontentComponent } from './admincontent.component';

describe('AdmincontentComponent', () => {
  let component: AdmincontentComponent;
  let fixture: ComponentFixture<AdmincontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdmincontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

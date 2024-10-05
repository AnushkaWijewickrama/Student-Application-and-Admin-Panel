import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlicenseComponent } from './studentlicense.component';

describe('StudentlicenseComponent', () => {
  let component: StudentlicenseComponent;
  let fixture: ComponentFixture<StudentlicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentlicenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

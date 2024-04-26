import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskResponsibleButtonComponent } from './task-responsible-button.component';

describe('TaskResponsibleButtonComponent', () => {
  let component: TaskResponsibleButtonComponent;
  let fixture: ComponentFixture<TaskResponsibleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskResponsibleButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskResponsibleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

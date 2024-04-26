import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskResponsibleDialogComponent } from './task-responsible-dialog.component';

describe('TaskResponsibleDialogComponent', () => {
  let component: TaskResponsibleDialogComponent;
  let fixture: ComponentFixture<TaskResponsibleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskResponsibleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskResponsibleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

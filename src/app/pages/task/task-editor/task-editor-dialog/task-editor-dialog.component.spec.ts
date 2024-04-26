import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditorDialogComponent } from './task-editor-dialog.component';

describe('TaskEditorDialogComponent', () => {
  let component: TaskEditorDialogComponent;
  let fixture: ComponentFixture<TaskEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

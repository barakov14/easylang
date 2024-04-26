import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditorButtonComponent } from './task-editor-button.component';

describe('TaskEditorButtonComponent', () => {
  let component: TaskEditorButtonComponent;
  let fixture: ComponentFixture<TaskEditorButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEditorButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskEditorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

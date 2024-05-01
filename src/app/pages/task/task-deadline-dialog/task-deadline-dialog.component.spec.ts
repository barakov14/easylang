import {ComponentFixture, TestBed} from '@angular/core/testing'

import {TaskDeadlineDialogComponent} from './task-deadline-dialog.component'

describe('TaskDeadlineDialogComponent', () => {
  let component: TaskDeadlineDialogComponent
  let fixture: ComponentFixture<TaskDeadlineDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDeadlineDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TaskDeadlineDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

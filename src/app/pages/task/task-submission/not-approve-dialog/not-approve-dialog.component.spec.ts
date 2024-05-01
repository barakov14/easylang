import {ComponentFixture, TestBed} from '@angular/core/testing'

import {NotApproveDialogComponent} from './not-approve-dialog.component'

describe('NotApproveDialogComponent', () => {
  let component: NotApproveDialogComponent
  let fixture: ComponentFixture<NotApproveDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotApproveDialogComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(NotApproveDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

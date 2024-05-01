import {ComponentFixture, TestBed} from '@angular/core/testing'

import {RouteHierarchyComponent} from './route-hierarchy.component'

describe('RouteHierarchyComponent', () => {
  let component: RouteHierarchyComponent
  let fixture: ComponentFixture<RouteHierarchyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteHierarchyComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RouteHierarchyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

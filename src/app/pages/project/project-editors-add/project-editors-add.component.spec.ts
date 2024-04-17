import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditorsAddComponent } from './project-editors-add.component';

describe('ProjectEditorsAddComponent', () => {
  let component: ProjectEditorsAddComponent;
  let fixture: ComponentFixture<ProjectEditorsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEditorsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectEditorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

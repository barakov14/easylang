import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateButtonComponent } from './users-create-button.component';

describe('UsersCreateButtonComponent', () => {
  let component: UsersCreateButtonComponent;
  let fixture: ComponentFixture<UsersCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersCreateButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

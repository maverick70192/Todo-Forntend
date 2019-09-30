import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordSecurityQuestionComponent } from './forgot-password-security-question.component';

describe('ForgotPasswordSecurityQuestionComponent', () => {
  let component: ForgotPasswordSecurityQuestionComponent;
  let fixture: ComponentFixture<ForgotPasswordSecurityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordSecurityQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

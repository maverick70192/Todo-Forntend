import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-security-question',
  templateUrl: './forgot-password-security-question.component.html',
  styleUrls: ['./forgot-password-security-question.component.css']
})
export class ForgotPasswordSecurityQuestionComponent implements OnInit {
  username: string;
  email: string;
  securityQuestion: string;
  answer: string;
  invalidInfo: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkForInfo() {
    this.router.navigate(['forgot-password-set']);
  }

}

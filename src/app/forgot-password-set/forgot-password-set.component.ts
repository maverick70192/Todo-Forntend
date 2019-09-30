import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-set',
  templateUrl: './forgot-password-set.component.html',
  styleUrls: ['./forgot-password-set.component.css']
})
export class ForgotPasswordSetComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  retypePassword: string;
  securityQuestion: string;
  answer: string;
  invalidInfo: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  setNewPassword() {
    this.router.navigate(['success']);
  }
}

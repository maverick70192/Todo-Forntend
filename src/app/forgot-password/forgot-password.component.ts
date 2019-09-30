import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterInfo } from '../service/auth/model/register-info';
import { UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user: RegisterInfo;
  errorMessage: string;
  invalidInfo: boolean = false;
  constructor(private router: Router, 
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.user = new RegisterInfo('', '', '', '', '', '');
  }

  checkForInfo() {
    this.userDataService.isUserExistsByUsernameAndEmail(this.user).subscribe(
      data => {
        if(data) {
          console.log(data);
          console.log("User exists with provided information!");
          this.router.navigate(['forgot-password-security-question'], { queryParams: { username: this.user.username, email: this.user.email } });
        }
        else {
          this.errorMessage = "Provided information are invalid. Please check again!";
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}

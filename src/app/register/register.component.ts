import { Component, OnInit } from '@angular/core';
import { RegisterInfo } from '../service/auth/model/register-info';
import { AuthenticationService } from '../service/auth/authentication.service';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerInfo: RegisterInfo;
  isRegistered = false;
  isRegitrationFailed = false;
  errorMessage : string;
  questions: string[];

  constructor(private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.registerInfo = new RegisterInfo('', '', '', '', '', '');
    this.questions = [
      "Your middle name?",
      "Your favourite character name?",
      "Your favourite sport name?",
      "Your hometown name?"];
  }

  handleRegistration() {
    console.log(this.registerInfo);

    this.authenticationService.register(this.registerInfo).subscribe(
      data => {
        console.log(data);
        this.isRegistered = true;
        this.isRegitrationFailed = false;
        this.messageService.setMessage("You have registered successfully!");
        this.router.navigate(['success']);

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isRegitrationFailed = true;
      }
    );
  }

  // handleRegistration() {
  //   this.userDataService.createUser(this.user)
  //     .subscribe(
  //       response => {
  //         this.messageService.setMessage("You have registered successfully!");
  //         this.router.navigate(['success']);
  //       },
  //       error => {
  //         this.router.navigate(['error']);
  //       }
  //     );
  // }
}

import { Component, OnInit } from '@angular/core';
import { RegisterInfo } from '../service/auth/model/register-info';
import { MessageService } from '../service/message.service';
import { Router } from '@angular/router';
import { UserDataService } from '../service/data/user-data.service';
import { StorageService } from '../service/auth/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: RegisterInfo;
  isProfileEdited = false;
  isEditProfileFailed = false;
  errorMessage : string;
  questions: string[];
  username: string;

  constructor(private messageService: MessageService,
    private router: Router,
    private storageService: StorageService,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.username = this.storageService.getUsername();
    this.user = new RegisterInfo('', '', '', '', '', '');
    this.questions = [
      "Your middle name?",
      "Your favourite character name?",
      "Your favourite sport name?",
      "Your hometown name?"];
      this.loadUserData();
      console.log(this.storageService.getToken())
  }

  loadUserData() {
    this.userDataService.getUser(this.storageService.getUsername()).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  editProfileProcess() {
    console.log("editProfileProcess()");
    console.log(this.user);

    this.userDataService.updateUser(this.username, this.user).subscribe(
      data => {
        console.log(data);
        this.isProfileEdited = true;
        this.isEditProfileFailed = false;
        this.messageService.setMessage("You have edited profile successfully!");
        this.router.navigate(['profile', this.username]);

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isEditProfileFailed = true;
      }
    );
  }
}

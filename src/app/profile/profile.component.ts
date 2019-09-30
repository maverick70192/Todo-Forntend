import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/data/user-data.service';
import { RegisterInfo } from '../service/auth/model/register-info';
import { StorageService } from '../service/auth/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  user: RegisterInfo = new RegisterInfo('', '', '', '', '', '');
  errorMessage: string;
  constructor(private userDataService: UserDataService, 
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.loadUserData();
    this.username = this.storageService.getUsername();
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

  editProfile() {
    console.log("edit-profile");
    console.log(this.username);
    this.router.navigate(['edit-profile', this.username]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { LoginInfo } from '../service/auth/model/login-info';
import { AuthenticationService } from '../service/auth/authentication.service';
import { StorageService } from '../service/auth/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;
  roles: string[] = [];
  loginInfo: LoginInfo;

  constructor(private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.loginInfo = new LoginInfo('', '');
    // if(this.storageService.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.storageService.getAuthorities();
    // }
  }

  handleLogin() {
    console.log(this.loginInfo);

    this.authenticationService.login(this.loginInfo).subscribe(
      data => {
        console.log(data);
        this.storageService.saveToken(data.accessToken);
        this.storageService.saveUsername(data.username);
        this.storageService.saveAuthorities(data.authorities);
        this.storageService.saveTokenType(data.tokenType);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getAuthorities();
        this.router.navigate(['welcome', this.storageService.getUsername()]);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // handleJWTAuthLogin() {
  //   this.basicAuthenticationService.executeJWTAuthenticationService(this.username, this.password)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.invalidLogin = false;
  //         this.router.navigate(['welcome', this.username]);    
  //       },
  //       error => {
  //         console.log(error);
  //         this.invalidLogin = true;
  //       }
  //     );
  // }

  // handleLogin() {
  //   if(this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
  //     this.invalidLogin = false;
  //     this.router.navigate(['welcome', this.username]);
  //   }
  //   else {
  //     this.invalidLogin = true;
  //   }
  // }

  // handleBasicAuthLogin() {
  //   this.basicAuthenticationService.executeAuthenticationService(this.username, this.password)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.invalidLogin = false;
  //         this.router.navigate(['welcome', this.username]);    
  //       },
  //       error => {
  //         console.log(error);
  //         this.invalidLogin = true;
  //       }
  //     );
  // }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticationService(username : string, password : string) {
    return this.http.post<any>(`${API_URL}/authenticate`, {
      username, 
      password
    }
    // or { "username" : username, "password" : password }
    )
        .pipe(
          map(
            data => {
              sessionStorage.setItem(AUTHENTICATED_USER, username);
              sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
              console.log("TOKEN : " + sessionStorage.getItem(TOKEN));
              return data;
            }
          )
        );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    let user = this.getAuthenticatedUser();
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}

  // executeAuthenticationService(username : string, password : string) {
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   let headers = new HttpHeaders({
  //     Authorization: basicAuthHeaderString
  //   });
  //   return this.http.get<Authentication>(
  //     `${API_URL}/basicauth`, 
  //       { headers})
  //       .pipe(
  //         map(
  //           data => {
  //             sessionStorage.setItem(AUTHENTICATED_USER, username);
  //             sessionStorage.setItem(TOKEN, basicAuthHeaderString);
  //             return data;
  //           }
  //         )
  //       );
  // }

// export class Authentication {
//   constructor(private message: string) {}
// }
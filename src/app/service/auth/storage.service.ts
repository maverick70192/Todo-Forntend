import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const TOKEN_TYPE = 'AuthTokenType';
const USERNAME_KEY = 'AUthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roles: Array<string> = [];

  constructor() { }

  isUserLoggedIn() {
    return this.getUsername() != null;
  }

  logOut() {
    sessionStorage.clear();
  }

  public saveToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
    console.log("TOKEN : " + sessionStorage.getItem(TOKEN_KEY));
  }

  public getToken() : string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveTokenType(tokenType: string) {
    sessionStorage.removeItem(TOKEN_TYPE);
    sessionStorage.setItem(TOKEN_TYPE, tokenType);
  }

  public getTokenType() : string {
    return sessionStorage.getItem(TOKEN_TYPE);
  }

  public saveUsername(username: string) {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername() : string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
 
  public saveAuthorities(authorities: string[]) {
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
 
  public getAuthorities(): string[] {
    this.roles = [];
 
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
 
    return this.roles;
  }
}

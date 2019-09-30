import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_URL, JPA_API_URL } from 'src/app/app.constants';
import { LoginInfo } from './model/login-info';
import { Observable } from 'rxjs';
import { JWTResponse } from './model/jwt-response';
import { RegisterInfo } from './model/register-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private loginUrl: string = `${ JPA_API_URL }/auth/login`;
  // private registerUrl: string = `${ JPA_API_URL }/auth/register`;

  private loginUrl: string = `${ API_URL }/api/auth/signin`;
  private registerUrl: string = `${ API_URL }/api/auth/signup`;

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo) : Observable<JWTResponse> {
    return this.http.post<JWTResponse>(this.loginUrl, loginInfo, httpOptions);
  }

  register(registerInfo: RegisterInfo) : Observable<string> {
    return this.http.post<string>(this.registerUrl, registerInfo, httpOptions);
  } 
}
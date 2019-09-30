import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JPA_API_URL } from 'src/app/app.constants';
import { RegisterInfo } from '../auth/model/register-info';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<RegisterInfo[]>(`${JPA_API_URL}/users`);
  }

  getUser(username: string) {
    console.log("getUser(username)");
    return this.http.get<RegisterInfo>(`${JPA_API_URL}/users/${username}`);
  }

  isUserExistsByUsernameAndEmail(user: RegisterInfo) {
    return this.http.get<boolean>(`${JPA_API_URL}/users/exists`, { params: { username: user.username, email: user.email } });
  }

  createUser(registerInfo: RegisterInfo) {
    return this.http.post(`${JPA_API_URL}/users`, registerInfo);
  }

  updateUser(username: string, registerInfo: RegisterInfo) {
    console.log("updateUser(username, registerInfo)");
    return this.http.put(`${JPA_API_URL}/users/${username}`, registerInfo);
  }

  deleteUser(username: string) {
    return this.http.delete(`${JPA_API_URL}/users/${username}`);
  }
}

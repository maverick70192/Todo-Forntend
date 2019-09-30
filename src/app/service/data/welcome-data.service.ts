import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean");
    // console.log("Execute HelloWorldBeanService!");
  }

  executeHelloWorldBeanServiceWithPathVariable(username : string) {
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // });
    return this.http.get<HelloWorldBean>(
      `http://localhost:8080/hello-world-bean/path-variable/${username}`, 
        // { headers});
    );
  }

  // createBasicAuthenticationHttpHeader() {
  //   let username: string = "kishangaur324@";
  //   let password: string = "Darkside324@";
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
}

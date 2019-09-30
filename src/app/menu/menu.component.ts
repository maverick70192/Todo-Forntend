import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { StorageService } from '../service/auth/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username: string = '';
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    if(this.storageService.getToken()) {
      this.username = this.storageService.getUsername();
    }
  }
}

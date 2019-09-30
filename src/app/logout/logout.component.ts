import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/auth/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.logOut();
  }

}

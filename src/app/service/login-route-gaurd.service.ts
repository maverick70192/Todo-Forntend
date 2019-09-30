import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { StorageService } from './auth/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGaurdService {
  constructor(private storageService: StorageService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let username : string = this.storageService.getUsername();
    if (!this.storageService.isUserLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['welcome', username]);
      return false;
    }
  }
}

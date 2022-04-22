import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserDataService } from "../services/user-data.service";

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly router: Router,
  ) { }
  
  canActivate() {
    const sessionStatus = this.userDataService.getActiveUser();
    
    if (sessionStatus) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
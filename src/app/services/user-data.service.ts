import { Injectable } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { UserDataKey } from './user-data.key';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  constructor(
    private readonly apiDataService: ApiDataService
  ) { }

  getActiveUser() {
    return this.apiDataService.verifyActiveUser()
    .subscribe({
      next: (res) => {
        return true;
      },
      error: (err) => {
        return false;
      }
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiOptionsModel } from '../models/api-options.model';
import { UserModel } from '../models/user.model';
import { constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private default_headers: HttpHeaders = new HttpHeaders();
  private readonly api_options: ApiOptionsModel = { headers: undefined };

  constructor(
    private readonly client: HttpClient,
  ) { }

// USERS API CALLS
  postUser(payload: UserModel): Observable<any> {
    return this._post(`${constants.API_URL}/users`, payload);
  }

  verifyUser(payload: UserModel): Observable<any> {
    return this._post(`${constants.API_URL}/users/verify`, payload);
  }

  verifyActiveUser(): Observable<any> {
    return this._get(`${constants.API_URL}/users/session`);
  }

// GENERIC API CALLS TO STANDARIZE USAGE
  private _post(url: string, body: any, headers?: HttpHeaders) {
    if (headers) {
      this.api_options.headers = headers;
    }
    return this.client.post(url, body, this.api_options);
  }

  private _get(url: string, headers?: HttpHeaders) {
    if (headers) {
      this.api_options.headers = headers;
    }
    return this.client.get(url, this.api_options);
  }
}

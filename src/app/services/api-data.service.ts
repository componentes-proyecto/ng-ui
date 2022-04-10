import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiOptionsModel } from '../models/api-options.model';
import { Common } from '../models/common.model';
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
  postUser(payload: Common): Observable<any> {
    return this._post(`${constants.API_URL}/users`, payload);
  }

// GENERIC API CALLS TO STANDARIZE USAGE
  _post(url: string, body: Common, headers?: HttpHeaders) {
    if (headers) {
      this.api_options.headers = headers;
    }
    return this.client.post(url, body, this.api_options);
  }
}

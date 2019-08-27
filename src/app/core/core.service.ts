import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  menuOpen = new Subject();

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${environment.apiUrl}/profile/me`);
  }
}

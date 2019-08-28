import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  login(user) {
    return this.http.post(`${environment.apiUrl}/auth/signin`, user,  {observe: 'response'});
  }

  logout() {
    return this.http.get(`${environment.apiUrl}/auth/logout`);
  }

}

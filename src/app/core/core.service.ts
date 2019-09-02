import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  menuOpen = new Subject();
  alertMessageError = new Subject();
  alertMessageSuccess = new Subject();

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${environment.apiUrl}/profile/me`);
  }


  showSuccessAlert() {
    this.alertMessageSuccess.next(true);
    setTimeout(() => {
      this.alertMessageSuccess.next(false);
    }, 3000);
  }

  showErrorAlert() {
    this.alertMessageError.next(true);
    setTimeout(() => {
      this.alertMessageError.next(false);
    }, 3000);
  }

}

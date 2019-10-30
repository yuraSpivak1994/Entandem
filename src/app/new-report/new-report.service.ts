import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserInfo } from "../shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class NewReportService {

  user: UserInfo;

  constructor(private http: HttpClient) { }

  getUnitDetail() {
    return this.http.get(environment.apiUrl + '/profile/tariff/detail/' + 80)
      .pipe(
        map((response: any) => {
          return response;
        }), catchError(val => throwError(val)));
  }

  getTax(province) {
    return this.http.get(environment.apiUrl + '/profile/tariff/tax/' + province)
      .pipe(
        map((response: any) => {
          return response;
        }), catchError(val => throwError(val)));
  }

  calculateTariff(tariffSeq, tariff) {
    return this.http.post(environment.apiUrl + '/profile/report/send/' + tariffSeq, tariff)
      .pipe(
        map((response: any) => {
          return response;
        }), catchError(val => throwError(val)));
  }

  takeUserInfo(user) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUserProvince() {
  return this.user = JSON.parse(localStorage.getItem('userInfo'));
  }
}

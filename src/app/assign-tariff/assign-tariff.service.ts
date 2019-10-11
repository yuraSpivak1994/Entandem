import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignTariffService {

  constructor(private http: HttpClient) { }

  getAllTariffs() {
    return this.http.get(environment.apiUrl + '/profile/tariff/all')
      .pipe(
        map((response: any) => {
          return response;
        }), catchError(val => throwError(val)));
  }

  assignTariff(tariff, tariffSeq) {
    return this.http.post(environment.apiUrl + '/profile/tariff/assign/' + tariffSeq, tariff)
      .pipe(
        map((response: any) => {
          return response;
        }), catchError(val => throwError(val)));
  }

  getUnit(tariffSeq) {
    return this.http.get(environment.apiUrl + '/profile/tariff/user-tariffs/' + tariffSeq)
      .pipe(
        map((response: any) => {
          return response;
        }), catchError(val => throwError(val)));
  }

}

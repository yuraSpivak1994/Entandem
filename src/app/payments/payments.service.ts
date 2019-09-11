import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  makePayment(data) {
    return this.http.post(`${environment.apiUrl}/profile/make-payment`,  data)
  }

  getPayments(sortArray): Observable<any>  {
    return this.http.post(`${environment.apiUrl}/profile/payments`, sortArray)
  }
}

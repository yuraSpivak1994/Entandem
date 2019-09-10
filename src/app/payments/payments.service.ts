import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  makePayment(data) {
    return this.http.post(`${environment.apiUrl}/profile/make-payment`,  data)
  }

  getPayments(sortArray) {
    return this.http.post(`${environment.apiUrl}/profile/payments`, sortArray)
  }
}

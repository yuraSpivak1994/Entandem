import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { PaymentData } from "../shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient) { }

  makePayment(data) {
    return this.http.post(`${environment.apiUrl}/profile/make-payment`,  data)
  }

  getPaymentsDetail(number): Observable<PaymentData> {
    return this.http.get(`${environment.apiUrl}/profile/payment/detail/${number}`)
  }
}

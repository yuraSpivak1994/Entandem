import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CoreService } from "../core/core.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,
              public coreService: CoreService) { }

  editProfile(data){
    return this.http.post(`${environment.apiUrl}/profile/account/edit`, data);
  }

  editEmail(data, lang){
    return this.http.post(`${environment.apiUrl}/profile/account/edit-email/E`, data);
  }


  editPassword(data){
    return this.http.post(`${environment.apiUrl}/profile/account/change-password`, data);
  }

  setPromotion(letter){
    return this.http.get(`${environment.apiUrl}/profile/account/promo/${letter}`);
  }

  getAllContacts(){
    return this.http.get(`${environment.apiUrl}/profile/account/contacts`);
  }

  addAccount(user){
    debugger
    return this.http.get(`https://wp-dev.entandemdevelopment.com/api/profile/account/contacts`, user);
  }

}

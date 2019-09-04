import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  idAccount: number;

  constructor(private http: HttpClient) { }

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

  addAccount(primary, user){
    return this.http.post(`${environment.apiUrl}/profile/account/add-contact/${primary}`, user);
  }

  deleteAccount(id){
    return this.http.get(`${environment.apiUrl}/profile/account/del-contact/${id}`);
  }

  editAccount(isPrimary, user){
    return this.http.post(`${environment.apiUrl}/profile/account/edit-contact/${this.idAccount}/${isPrimary}`, user);
  }

  setPrimaryContact(id){
    return this.http.get(`${environment.apiUrl}/profile/account/primary-contact/ ${id}`);
  }

}

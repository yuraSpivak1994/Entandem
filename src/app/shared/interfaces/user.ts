import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

export interface User {
  hearAbout?: string;
  lang?: string;
  hearAboutOther?: string;
  mailingEnable?: string;
  establishmentName?: string;
  establishmentStreet?: string;
  establishmentProvince?: string;
  establishmentCity?: string;
  establishmentPostalCode?: string;
  mailingStreet?: string;
  mailingProvince?: string;
  mailingCity?: string;
  mailingPostalCode?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  fax?: string;
  password?: string;
  passwordRepeat?: string;
  newEmail?: string;
  oldEmail?: string;
  oldPassword?: string;
}

export interface UserInfo {
  USER_ID?: number;
  ACCT_NO?: string;
  EMAIL?: string;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  PHONE?: string;
  FAX?: string;
  AZURE_ID?: string;
  ROLE?: number;
  LANG?: string;
  BUSINESS_NAME?: string;
  ADDRESS?: string;
  CITY?: string;
  PROVINCE?: string;
  POSTAL_CODE?: string;
  EMAIL_VERIFIED?: number;
  ACTIVE?: number;
  CREATED_AT?: string;
  RECEIVE_PROMO_EMAILS?: string;
  BALANCE?: string;
}

export interface Account {
  CONTACT_LAST_NAME?: string;
  CONTACT_MIDDLE_NAME?: string;
  E_MAIL?: string;
  EPR_PHONE_NO?: string;
  PRIMARY_CONTACT?: string;
  CONTACT_ID?: number;
}

export interface AccountEdit {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  primary?: string;
}

export interface Payment {
  total?: string;
  cardnum?: string;
  carddate?: string;
  cardcode?: number;
}

export interface PaymentData {
  ACCT_CHECK_NO?: any;
  ACCT_NO?: string;
  AUTHORIZATION_NO?: string;
  FIRSTTWO?: string;
  LASTFOUR?: string;
  LASTTWO?: string;
  MERCHANT_NO?: string;
  PAYMENT_AMT?: number;
  PAYMENT_DATE?: string;
  PAYMENT_STATUS?: string;
  PAYMENT_TYPE?: string;
  REQUEST_NO?: string;
  TERR_CODE?: number;
  TRANS_DATE?: string;
}

export interface PeriodicElement {
  time: string;
  dateTime: string;
  pay: string;
  symbol: string;
  menu?: string;
  type?: string;
  amount?: string;
  status?: string;
}

export interface AllTariff {
  DATE_END_EFFECTIVE?: any;
  DATE_START_EFFECTIVE?: string;
  DATE_TARIFF_END?: any;
  DATE_TARIFF_START?: string;
  FREQUENCY?: string;
  TRFF_DESC_ENG?: string;
  TRFF_DESC_FR?: string;
  TRFF_GROUP?: number;
  TRFF_NAME_ENG?: string;
  TRFF_NAME_FR?: string;
  VALID_YEAR?: number;
}

export interface UnitTariff {
    ACCT_NO?: number;
    ACCT_TRFF_ID?: number;
    COMPANY?: string;
    START_DATE?: string;
    TRFF_GROUP?: number;
    ROOM_NAME?: string;
    TRFF_NAME_ENG?: string;
    TRFF_DESC_ENG?: string;
    REV_DATE?: string;
    VALID_YEAR?: number;
}

export interface Count100 {
  start?: any;
  end?: any
}

export interface Count300 {
  start?: any;
  end?: any
}

export interface Count500 {
  start?: any;
  end?: any
}

export interface CountOver500 {
  start?: any;
  end?: any
}

export interface TariffTax {
  DATE_CREATED?: string;
  DATE_END?: any;
  DATE_START?: string;
  FLAG_PRORATED?: string;
  PROVINCE_ID?: string;
  RATE?: number;
  TAX_CODE?: string;
}

export interface TableCalculate {
  COMPANY?: string;
  LOWER_BOUND?: number;
  TARIFF_DETAIL_SEQ_NO?: number;
  TRFF_GROUP?: number;
  TRFF_NO?: string;
  TYPE_OF_UNIT?: string;
  UNIT_CHARGE?: number;
  UPPER_BOUND?: number;
}

export interface TotalCard {
  resoundTotal?: any;
  sanTotal?: number;
  subtotal?: any;
}

export class PaymentsHttpDatabase {
  constructor(private _httpClient: HttpClient) {
  }

  getRepoIssues(sortArray): Observable<any> {
    const requestUrl =
      `${environment.apiUrl}/profile/payments`;

    return this._httpClient.post<any>(requestUrl, sortArray);
  }
}

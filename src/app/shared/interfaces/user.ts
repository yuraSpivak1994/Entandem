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

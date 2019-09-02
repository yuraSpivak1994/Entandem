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

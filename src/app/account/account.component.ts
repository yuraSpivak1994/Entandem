import { Component, Inject, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { fadeInAnimation } from '../shared/animation';
import { MatDialog } from '@angular/material';
import { Account, User, UserInfo } from '../shared/interfaces/user';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "./account.service";
import { ValidatePassword } from "../auth/registration/registration.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  address: string;
  name: string;
  city: string;
  province: string;
  phone: string;
  postalCode: string;
  email?: string;

}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit {
  showSearch = true;
  user: UserInfo;
  accountContacts: Account;
  showSpinner =  false;
  numberPromotion = 0;
  address: string;
  name: string;
  city: string;
  province: string;
  phone: string;
  postalCode: string;
  email: string;

  constructor(public coreService: CoreService,
              public dialog: MatDialog,
              private accountService: AccountService) { }

  ngOnInit() {
    this.getUserData();
    this.getContactsTable();
  }

getUserData() {
    this.showSpinner = true;
  this.coreService.getUser()
    .subscribe((res: UserInfo) => {
      this.user = res;
      this.showSpinner = false
    }, error => {
      console.log(error);
      this.showSpinner = false;
    })
}

getContactsTable() {
    this.accountService.getAllContacts()
      .subscribe((data) => {
        this.accountContacts = data;
        console.log(data);
      },error => {
        console.log(error);
      })
}

  checkFieldName() {
    if (this.name) {
      return this.name
    } else if (this.user.EMAIL) {
      return this.user.BUSINESS_NAME
    }
  }

  checkFieldAddress() {
    if (this.address) {
      return this.address
    } else if (this.user.ADDRESS) {
      return this.user.ADDRESS
    }
  }

  checkFieldPostalCode() {
    if (this.postalCode) {
      return this.postalCode
    } else if (this.user.POSTAL_CODE) {
      return this.user.POSTAL_CODE
    }
  }

  checkFieldPhone() {
    if (this.phone) {
      return this.phone
    } else if (this.user.PHONE) {
      return this.user.PHONE
    }
  }

  checkFieldCity() {
    if (this.city) {
      return this.city
    } else if (this.user.CITY) {
      return this.user.CITY
    }
  }

  checkFieldProvince() {
    if (this.province) {
      return this.province
    } else if (this.user.PROVINCE) {
      return this.user.PROVINCE
    }
  }


  openDialog() {
    this.email = this.user.EMAIL;
    const dialogRef = this.dialog.open(EmailDialog, {
      width: '100%',
      maxWidth: '650px',
      data: {
        email: this.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogProfile() {
    this.name = this.user.BUSINESS_NAME;
    this.postalCode = this.user.POSTAL_CODE;
    this.province = this.user.PROVINCE;
    this.postalCode = this.user.POSTAL_CODE;
    this.address = this.user.ADDRESS;
    this.phone = this.user.PHONE;
    this.city = this.user.CITY;
    const dialogRef = this.dialog.open(ProfileDialog, {
      width: '100%',
      maxWidth: '750px',
      data: {
        name: this.name,
        address: this.address,
        city: this.city,
        province: this.province,
        postalCode: this.postalCode,
        phone: this.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result.name;
      this.postalCode = result.postalCode;
      this.province = result.province;
      this.postalCode = result.postalCode;
      this.address = result.address;
      this.phone = result.phone;
    });
  }

  openDialogPassword() {
    const dialogRef = this.dialog.open(PasswordDialog,  {
      width: '100%',
      maxWidth: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogContact () {
    const dialogRef = this.dialog.open(ContactModal, {
      width: '100%',
      maxWidth: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(DeleteModal, {
      width: '100%',
      maxWidth: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  togglePromotion() {
    if(this.numberPromotion === 0) {
      this.numberPromotion = 1;
      this.setPromotion("Y");
    }else {
      this.numberPromotion = 0;
      this.setPromotion("N");
    }
  }

  setPromotion(letter) {
    this.showSpinner = true;
    this.accountService.setPromotion(letter).
    subscribe((res) => {
      this.showSpinner = false;
    }, error => {
      this.showSpinner = false;
      console.log(error);
    })
  }

}

@Component({
  selector: 'email-modal',
  templateUrl: 'email-modal.html',
})
export class EmailDialog implements OnInit{

  formEmail: FormGroup;
  emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

  constructor (private formBuilder: FormBuilder,
               public coreService: CoreService,
               public accountService: AccountService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.initEmailForm()
  }

  initEmailForm() {
    this.formEmail = this.formBuilder.group({
      oldEmail: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const req: User = {};
    req.lang = 'E';
    req.oldEmail = this.formEmail.controls.oldEmail.value;
    req.email = this.formEmail.controls.email.value;
    req.password = this.formEmail.controls.password.value;


    this.accountService.editEmail(req, req.lang)
      .subscribe((res) => {
        this.coreService.showSuccessAlert()
      },error => {
        this.coreService.showErrorAlert()
        console.log(error);
      })
  }


}

@Component({
  selector: 'profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileDialog  implements OnInit {

  formProfile: FormGroup;
  phoneRegex = new RegExp(/^([1-9][0-9]*)$/);

  constructor (private formBuilder: FormBuilder,
               public coreService: CoreService,
               public accountService: AccountService,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


  ngOnInit(): void {
    this.initProfileForm()
  }

  initProfileForm() {
    this.formProfile = this.formBuilder.group({
      establishmentStreet: new FormControl(null, [Validators.required]),
      establishmentName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
      establishmentProvince: new FormControl(null, [Validators.required]),
      establishmentCity: new FormControl(null, [Validators.required]),
      establishmentPostalCode: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
      const req: User = {};
      req.lang = 'E';
      req.establishmentStreet = this.formProfile.controls.establishmentStreet.value;
      req.establishmentProvince = this.formProfile.controls.establishmentProvince.value;
      req.establishmentCity = this.formProfile.controls.establishmentCity.value;
      req.establishmentPostalCode = this.formProfile.controls.establishmentPostalCode.value;
      req.establishmentName = this.formProfile.controls.establishmentName.value;
      req.phone = this.formProfile.controls.phone.value;


      this.accountService.editProfile(req)
        .subscribe((res) => {
          this.coreService.showSuccessAlert();
        },error => {
          this.coreService.showErrorAlert();
          console.log(error);
        })
    }

}

@Component({
  selector: 'password-modal',
  templateUrl: 'password-modal.html',
})
export class PasswordDialog implements OnInit{

  formPassword: FormGroup;
  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(^\S*$)/);
  repeatPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(^\S*$)/);

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private coreService: CoreService) {}

  initPasswordForm() {
    this.formPassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      passwordRepeat: ['', [Validators.pattern(this.repeatPasswordRegex)]],
    },{
      validator: ValidatePassword.MatchPassword
    });
  }

  ngOnInit(): void {
    this.initPasswordForm();
  }

  passwordHasNumber(password: string) {
    const validator = /\d/;
    return validator.test(password);
  }

  checkLengthPassword() {
    return this.formPassword.get('password').value.length >= 8
      && this.formPassword.get('password').value.length <= 20;
  }

  passwordHasLetter(password: string) {
    const validator = /[A-Z]/;
    return validator.test(password);
  }

  passworHasntSpace(password: string) {
    const validator = /^\S*$/;
    return validator.test(password);
  }


  onSubmit() {
    const req: User = {};
    req.oldPassword = this.formPassword.controls.oldPassword.value;
    req.password = this.formPassword.controls.password.value;
    req.passwordRepeat = this.formPassword.controls.passwordRepeat.value;


    this.accountService.editPassword(req)
      .subscribe((res) => {
        this.coreService.showSuccessAlert();
      },error => {
        this.coreService.showErrorAlert();
        console.log(error);
      })
  }

}

@Component({
  selector: 'delete-modal',
  templateUrl: 'delete-modal.html',
})
export class DeleteModal {}

@Component({
  selector: 'contact-modal',
  templateUrl: 'contact-modal.html',
})
export class ContactModal implements OnInit{
  account: Account;
  formAccount: FormGroup;
  phoneRegex = new RegExp(/^([1-9][0-9]*)$/);

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private coreService: CoreService) {
  }

  ngOnInit(): void {
    this.initAccountForm();
  }

  initAccountForm() {
    this.formAccount = this.formBuilder.group({
      CONTACT_LAST_NAME: new FormControl(null, [Validators.required]),
      CONTACT_MIDDLE_NAME: new FormControl(null, [Validators.required]),
      E_MAIL: new FormControl(null, [Validators.required]),
      EPR_PHONE_NO: new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
    });
  }

  onSubmit() {
    const req: Account = {};
    req.CONTACT_LAST_NAME = this.formAccount.controls.CONTACT_LAST_NAME.value;
    req.CONTACT_MIDDLE_NAME = this.formAccount.controls.CONTACT_MIDDLE_NAME.value;
    req.E_MAIL = this.formAccount.controls.E_MAIL.value;
    req.EPR_PHONE_NO = this.formAccount.controls.EPR_PHONE_NO.value;


    this.accountService.addAccount(req)
      .subscribe((res) => {
        console.log(res);
        this.coreService.showSuccessAlert();
      },error => {
        this.coreService.showErrorAlert();
        console.log(error);
      })
  }

}

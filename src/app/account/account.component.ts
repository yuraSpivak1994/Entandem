import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { fadeInAnimation } from '../shared/animation';
import { MatDialog } from '@angular/material';
import { User, UserInfo } from '../shared/interfaces/user';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "./account.service";
import { ValidatePassword } from "../auth/registration/registration.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit {
  showSearch = true;
  user: UserInfo;
  showSpinner =  false;
  private numberPromotion = 0;

  constructor(public coreService: CoreService,
              public dialog: MatDialog,
              private accountService: AccountService) { }

  ngOnInit() {
    this.getUserData();
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


  openDialog() {
    const dialogRef = this.dialog.open(EmailDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogProfile() {
    const dialogRef = this.dialog.open(ProfileDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogPassword() {
    const dialogRef = this.dialog.open(PasswordDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogContact() {
    const dialogRef = this.dialog.open(ContactDialog);

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
               public accountService: AccountService) {
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
               public accountService: AccountService) {
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
  selector: 'contact-modal',
  templateUrl: 'contact-modal.html',
})
export class ContactDialog {}

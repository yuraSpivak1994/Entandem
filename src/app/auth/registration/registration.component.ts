import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { fadeInAnimation } from '../../shared/animation';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../auth.service';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('passwordRepeat').value;
    if (password != confirmPassword) {
      abstractControl.get('passwordRepeat').setErrors({
        MatchPassword: true
      })
    } else {
      return null
    }
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [fadeInAnimation]
})
export class RegistrationComponent implements OnInit, ValidatePassword {

  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  otherValue = false;
  mailingInfo = false;
  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(^\S*$)/);
  repeatPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(^\S*$)/);
  emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  phoneRegex = new RegExp(/^([1-9][0-9]*)$/);
  showSpinner =  false;
  generalContent = true;
  thanksContent = false;
  errorContent = false;
  radioChecked = true;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      passwordRepeat: ['', [Validators.pattern(this.repeatPasswordRegex)]],
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
      establishmentName: new FormControl(null, [Validators.required]),
      establishmentStreet: new FormControl(null, [Validators.required]),
      establishmentProvince: new FormControl(null, [Validators.required]),
      establishmentCity: new FormControl(null, [Validators.required]),
      establishmentPostalCode: new FormControl(null, [Validators.required]),
      fax:'',
      hearAboutOther: '',
      hearAbout: new FormControl(null, [Validators.required])
      },{
      validator: ValidatePassword.MatchPassword
    });

    this.form2 = this.formBuilder.group({
      mailingStreet: '',
      mailingProvince: '',
      mailingCity: '',
      mailingPostalCode: '',
    });

    this.form3 = this.formBuilder.group({
      email: new FormControl(null, [Validators.required]),
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      passwordRepeat: ['', [Validators.pattern(this.repeatPasswordRegex)]],
      hearAboutOther: '',
      hearAbout: new FormControl(null, [Validators.required])
    },{
      validator: ValidatePassword.MatchPassword
    });

}

  passwordHasNumber(password: string) {
    const validator = /\d/;
    return validator.test(password);
  }

   removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key).clearValidators();
      form.get(key).updateValueAndValidity();
    }
  }
  toggleMailingInfo() {
    this.mailingInfo = !this.mailingInfo;
    if( this.mailingInfo){
      this.form2.controls["mailingStreet"].setValidators(Validators.required);
      this.form2.controls["mailingProvince"].setValidators(Validators.required);
      this.form2.controls["mailingCity"].setValidators(Validators.required);
      this.form2.controls["mailingPostalCode"].setValidators(Validators.required);
    }else {
      this.removeValidators(this.form2);
    }

  }

  checkHearAboutOther(value) {
    this.otherValue = value === 'O';
  }

  checkLengthPassword() {
    return this.form.get('password').value.length >= 8
      && this.form.get('password').value.length <= 20;
  }

  checkLengthPasswordForm3() {
    return this.form3.get('password').value.length >= 8
      && this.form3.get('password').value.length <= 20;
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
    this.showSpinner = true;
    if(this.form.valid) {
      const req: User = {};
      req.lang = 'E';
      req.hearAbout = this.form.controls.hearAbout.value;
      req.hearAboutOther = this.form.controls.hearAboutOther.value;
      req.mailingEnable = '';
      req.establishmentName = this.form.controls.establishmentName.value;
      req.establishmentStreet = this.form.controls.establishmentStreet.value;
      req.establishmentProvince = this.form.controls.establishmentProvince.value;
      req.establishmentCity = this.form.controls.establishmentCity.value;
      req.establishmentPostalCode = this.form.controls.establishmentPostalCode.value;
      req.mailingStreet = this.form2.controls.mailingStreet.value;
      req.mailingProvince = this.form2.controls.mailingProvince.value;
      req.mailingCity = this.form2.controls.mailingCity.value;
      req.mailingPostalCode = this.form2.controls.mailingPostalCode.value;
      req.firstName = this.form.controls.firstName.value;
      req.lastName = this.form.controls.lastName.value;
      req.email = this.form.controls.email.value;
      req.phone = this.form.controls.phone.value;
      req.fax = this.form.controls.fax.value;
      req.password = this.form.controls.password.value;
      req.passwordRepeat = this.form.controls.passwordRepeat.value;

      this.authService.register(req)
      .subscribe((res) => {
        this.generalContent = false;
        this.thanksContent = true;
        this.showSpinner = false;
      },error => {
        console.log(error);
        this.generalContent = false;
        this.errorContent = true;
        this.showSpinner = false;
      })
    }
  }
  onSubmit2() {
    this.showSpinner = true;
    if(this.form3.valid) {
      const req: User = {};
      req.lang = 'E';
      req.hearAbout = this.form3.controls.hearAbout.value;
      req.hearAboutOther = this.form3.controls.hearAboutOther.value;
      req.mailingEnable = '';
      req.establishmentName = 'sdf';
      req.establishmentStreet = 'sdf';
      req.establishmentProvince = 'AB';
      req.establishmentCity = 'lviv';
      req.establishmentPostalCode = 'A1A1A1';
      req.mailingStreet =  'wefr';
      req.mailingProvince = 'AB';
      req.mailingCity = 'fdg';
      req.mailingPostalCode = 'A1A1A1';
      req.firstName = 'erg';
      req.lastName = 'drg';
      req.email = this.form3.controls.email.value;
      req.phone = '+1555-555-5555';
      req.fax = 'wer';
      req.password = this.form3.controls.password.value;
      req.passwordRepeat = this.form3.controls.passwordRepeat.value;

      this.authService.register(req)
        .subscribe((res) => {
          this.generalContent = false;
          this.thanksContent = true;
          this.showSpinner = false;
        },error => {
          console.log(error);
          this.generalContent = false;
          this.errorContent = true;
          this.showSpinner = false;
        })
    }
  }
  toggleRadio() {
    this.radioChecked = !this.radioChecked;
  }
}

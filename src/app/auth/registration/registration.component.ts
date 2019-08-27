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
  otherValue = false;
  mailingInfo = false;
  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(^\S*$)/);
  emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  phoneRegex = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
  showSpinner =  false;
  generalContent = true;
  thanksContent = false;
  errorContent = false;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emailRegex)]),
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern(this.passwordRegex)]],
      passwordRepeat: [''],
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.phoneRegex)]),
      establishmentName: new FormControl(null, [Validators.required]),
      establishmentStreet: new FormControl(null, [Validators.required]),
      establishmentProvince: new FormControl(null, [Validators.required]),
      establishmentCity: new FormControl(null, [Validators.required]),
      establishmentPostalCode: new FormControl(null, [Validators.required]),
      fax:'',
      mailingStreet: '',
      mailingProvince: '',
      mailingCity: '',
      mailingPostalCode: '',
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

  toggleMailingInfo() {
    this.mailingInfo = !this.mailingInfo;
    this.form.controls["mailingStreet"].setValidators(Validators.required);
    this.form.controls["mailingProvince"].setValidators(Validators.required);
    this.form.controls["mailingCity"].setValidators(Validators.required);
    this.form.controls["mailingPostalCode"].setValidators(Validators.required);
  }

  checkHearAboutOther(value) {
    this.otherValue = value === 'O';
  }

  checkLengthPassword() {
    return this.form.get('password').value.length >= 8
      && this.form.get('password').value.length <= 20;
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
      req.mailingEnable = '';
      req.hearAbout = this.form.controls.hearAbout.value;
      req.hearAboutOther = this.form.controls.hearAboutOther.value;
      req.mailingEnable = '';
      req.establishmentName = this.form.controls.establishmentName.value;
      req.establishmentStreet = this.form.controls.establishmentStreet.value;
      req.establishmentProvince = this.form.controls.establishmentProvince.value;
      req.establishmentCity = this.form.controls.establishmentCity.value;
      req.establishmentPostalCode = this.form.controls.establishmentPostalCode.value;
      req.mailingStreet = this.form.controls.mailingStreet.value;
      req.mailingProvince = this.form.controls.mailingProvince.value;
      req.mailingCity = this.form.controls.mailingCity.value;
      req.mailingPostalCode = this.form.controls.mailingPostalCode.value;
      req.firstName = this.form.controls.firstName.value;
      req.lastName = this.form.controls.lastName.value;
      req.email = this.form.controls.email.value;
      req.phone = this.form.controls.phone.value;
      req.fax = this.form.controls.fax.value;
      req.password = this.form.controls.password.value;
      req.passwordRepeat = this.form.controls.passwordRepeat.value;

      this.authService.register(req)
      .subscribe((res) => {
        console.log(res);
        this.generalContent = false;
        this.thanksContent = true;
        this.showSpinner = false;
      },error => {
        console.log(error);
        this.generalContent = false;
        this.errorContent = true
        this.showSpinner = false;
      })
    }
  }
}

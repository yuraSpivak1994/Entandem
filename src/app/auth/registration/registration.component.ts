import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInAnimation } from '../../shared/animation';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [fadeInAnimation]
})
export class RegistrationComponent implements OnInit {


  form: FormGroup;
  otherValue = false;
  mailingInfo = false;
  passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(^\S*$)/);
  emaildRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
  phoneRegex = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(this.emaildRegex)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8), Validators.pattern(this.passwordRegex)]),
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
      });
}


  passwordHasNumber(password: string) {
    const validator = /\d/;
    return validator.test(password);
  }

  toggleMailingInfo() {
    this.mailingInfo = !this.mailingInfo;
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
    if(this.form.valid) {
      const req: User = {};
    }
  }
}

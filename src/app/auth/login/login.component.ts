import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor() { }

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required])
    });
  }

  validatePassword() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }
  validateEmail() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
}

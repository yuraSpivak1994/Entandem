import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInAnimation } from '../../shared/animation';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isChecked =  true;
  private expirateDay = 2;
  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) { }
  cookieKey = 'user';
  showSpinner = false;

  ngOnInit() {
    this.initLoginForm();
    this.userService.getToken(this.cookieKey)
  }

  initLoginForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required])
    });
  }

  checkCookie() {
    if (this.isChecked) {
      this.expirateDay = 14
    } else {
    this.expirateDay = 2
  }
  }
  validatePassword() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }
  validateEmail() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  onSubmit() {
    if(!this.form.invalid) {
      this.showSpinner = true;
      const req: User = {};
       req.email = this.form.controls.email.value;
       req.password = this.form.controls.password.value;
       this.authService.login(req)
         .subscribe((data) => {
           const token = data.headers.get('authorization');
           console.log(token);
           this.userService.saveUser(this.cookieKey, token, this.expirateDay );
           console.log(data);
           this.showSpinner = false;
           this.router.navigate(['/dashboard']);
         },(err: HttpErrorResponse) => {
           this.showSpinner = false;
           console.log(err);
         });
    }
  }
}

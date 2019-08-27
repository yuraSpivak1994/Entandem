import { Component, HostListener, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animation';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  cookieKey = 'user';
  constructor(private userService: UserService,
              private router: Router) {
    if(this.userService.getToken(this.cookieKey)) {
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 80) {
      const element = document.getElementById('header');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('header');
      element.classList.remove('sticky');
    }
  }

}

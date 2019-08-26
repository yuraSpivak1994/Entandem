import { Component, HostListener, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animation';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor() { }

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

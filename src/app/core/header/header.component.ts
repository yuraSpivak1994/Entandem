import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import { slideAnimation } from '../../shared/animation';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideAnimation]
})
export class HeaderComponent implements OnInit {

  hamburgerMenu = false;
  public innerWidth: any;
  id: number;
  expandedSectionFirst: any;
  expandedSectionSecond: any;
  cookieKey = 'user';
  constructor(private coreService: CoreService,
              private userService: UserService) { }

  ngOnInit() {
    this.detectWidth();
  }

  detectWidth() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {
      this.hamburgerMenu = true;
    }
  }

  logOut() {
    this.userService.deleteAllCookies(this.cookieKey)
  }
  toggleMenu() {
    this.hamburgerMenu = !this.hamburgerMenu;
    this.coreService.menuOpen.next(this.hamburgerMenu);
  }

  expandFirst(id) {
    if(id === this.expandedSectionFirst) {
      this.expandedSectionFirst = undefined;
    }else {
      this.expandedSectionSecond = undefined;
      this.expandedSectionFirst = id;
    }
  }
  expandSecond(id) {
    if(id === this.expandedSectionSecond) {
      this.expandedSectionSecond = undefined;
    }else {
      this.expandedSectionFirst = undefined;
      this.expandedSectionSecond = id;
    }
  }
}

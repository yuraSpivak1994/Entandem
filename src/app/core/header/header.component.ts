import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import { slideAnimation } from '../../shared/animation';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../../auth/auth.service';

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
  userInfo = {
    FIRST_NAME: '',
    LAST_NAME: ''
  };

  constructor(private coreService: CoreService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.detectWidth();
    this.getUserData()
  }

  detectWidth() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {
      this.hamburgerMenu = true;
    }
  }

  logOut() {
    this.authService.logout().subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
    });
    this.userService.deleteAllCookies(this.cookieKey);
  }

  toggleMenu() {
    this.hamburgerMenu = !this.hamburgerMenu;
    this.coreService.menuOpen.next(this.hamburgerMenu);
  }

  expandFirst(id) {
    if (id === this.expandedSectionFirst) {
      this.expandedSectionFirst = undefined;
    } else {
      this.expandedSectionSecond = undefined;
      this.expandedSectionFirst = id;
    }
  }

  expandSecond(id) {
    if (id === this.expandedSectionSecond) {
      this.expandedSectionSecond = undefined;
    } else {
      this.expandedSectionFirst = undefined;
      this.expandedSectionSecond = id;
    }
  }

  cutInitials(FIRST_NAME, LAST_NAME) {
    this.userInfo.FIRST_NAME = FIRST_NAME.substr(0, 1);
    this.userInfo.LAST_NAME = LAST_NAME.substr(0, 1);
  }

  getUserData() {
    this.coreService.getUser()
      .subscribe((res: any) => {
        this.userInfo.FIRST_NAME = res.FIRST_NAME;
        this.userInfo.LAST_NAME = res.LAST_NAME;
        this.cutInitials(this.userInfo.FIRST_NAME, this.userInfo.LAST_NAME)
      }, error => {
        console.log(error);
      });
  }
}

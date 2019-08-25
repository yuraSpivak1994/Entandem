import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import { slideAnimation } from '../../shared/animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideAnimation]
})
export class HeaderComponent implements OnInit {

  hamburgerMenu = false;
  public innerWidth: any;
  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.detectWidth();
  }

  detectWidth() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 767) {
      this.hamburgerMenu = true;
    }
  }

  toggleMenu() {
    this.hamburgerMenu = !this.hamburgerMenu;
    this.coreService.menuOpen.next(this.hamburgerMenu);
  }

}

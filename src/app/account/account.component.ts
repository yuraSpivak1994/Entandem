import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { fadeInAnimation } from '../shared/animation';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit {
  showSearch = true
  ;

  constructor(private coreService: CoreService) { }

  ngOnInit() {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}



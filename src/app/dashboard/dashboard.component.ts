import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { fadeInAnimation } from '../shared/animation';
import { UserInfo } from "../shared/interfaces/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {

  user: UserInfo;

  constructor(public coreService: CoreService) {
  }

  ngOnInit() {
    this.getUserData()
  }

  getUserData() {
    this.coreService.getUser()
      .subscribe((res: UserInfo) => {
        this.user = res;
      }, error => {
        console.log(error);
      });
  }
}

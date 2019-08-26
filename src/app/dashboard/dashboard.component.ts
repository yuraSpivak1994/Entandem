import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core/core.service';
import { fadeInAnimation } from '../shared/animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit{

  constructor(private coreService: CoreService) { }

  ngOnInit() {
  }
}

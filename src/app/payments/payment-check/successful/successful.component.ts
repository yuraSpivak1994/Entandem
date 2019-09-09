import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../shared/animation";
import { CoreService } from "../../../core/core.service";

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss'],
  animations: [fadeInAnimation]
})
export class SuccessfulComponent implements OnInit {

  constructor(public coreService: CoreService) { }

  ngOnInit() {
  }

}

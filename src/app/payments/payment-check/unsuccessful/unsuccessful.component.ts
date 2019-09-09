import { Component, OnInit } from '@angular/core';
import { CoreService } from "../../../core/core.service";
import { fadeInAnimation } from "../../../shared/animation";

@Component({
  selector: 'app-unsuccessful',
  templateUrl: './unsuccessful.component.html',
  styleUrls: ['./unsuccessful.component.scss'],
  animations: [fadeInAnimation]
})
export class UnsuccessfulComponent implements OnInit {

  constructor(public coreService: CoreService) { }

  ngOnInit() {
  }

}

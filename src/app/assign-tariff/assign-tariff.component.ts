import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../shared/animation";
import { AssignTariffService } from "./assign-tariff.service";
import { CoreService } from "../core/core.service";

@Component({
  selector: 'app-assign-tariff',
  templateUrl: './assign-tariff.component.html',
  styleUrls: ['./assign-tariff.component.scss'],
  animations: [fadeInAnimation]
})
export class AssignTariffComponent implements OnInit {
  panelOpenState = false;

  constructor(private assignTariffService: AssignTariffService,
              public coreService: CoreService) { }

  ngOnInit() {
  }

}

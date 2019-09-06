import { Component, OnInit } from '@angular/core';
import { CoreService } from "../../core/core.service";
import { fadeInAnimation } from "../../shared/animation";

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  animations: [fadeInAnimation]
})
export class PaymentHistoryComponent implements OnInit {

  constructor(public coreService: CoreService) { }

  ngOnInit() {
  }

}

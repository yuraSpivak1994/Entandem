import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from "../../../shared/animation";
import { CoreService } from "../../../core/core.service";
import { ActivatedRoute } from "@angular/router";
import { PaymentsService } from "../../payments.service";
import { PaymentData } from "../../../shared/interfaces/user";

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss'],
  animations: [fadeInAnimation]
})
export class SuccessfulComponent implements OnInit {

  public  id: number;
  public togglePages: boolean;
  private subscription: any;
  dataUser: PaymentData;
  userName: string;
  constructor(public coreService: CoreService,
              private route: ActivatedRoute,
              private paymentsService: PaymentsService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const id = params.AUTHORIZATION_NO;
      this.getUser(id);
    });
  }

  private getUser(id): void {
    this.paymentsService.getPaymentsDetail(id)
      .subscribe((data: any) => {
        this.dataUser = data;
        this.showUserName();
        if(data.PAYMENT_STATUS === 0) {

        } else {

        }
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  showUserName() {
    debugger
    this.coreService.userName
      .subscribe((data: any) => {
       this.userName = data;
        console.log(this.userName);
      })
  }

}

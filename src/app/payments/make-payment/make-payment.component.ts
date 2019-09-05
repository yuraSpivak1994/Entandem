import { Component, OnInit } from '@angular/core';
import { CoreService } from "../../core/core.service";
import { fadeInAnimation } from "../../shared/animation";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
  animations: [fadeInAnimation]
})
export class MakePaymentComponent implements OnInit {
  menuItem = true;
  form: FormGroup;
  visa = false;
  masterCard = false;
  americanExpress = false;
  dinersClub = false;
  jcb = false;
  numberRegex = new RegExp(/^([1-9][0-9]*)$/);
  date = new Date;

  minDate = this.date.setDate(6);
  maxDate = new Date(2020, 0, 1);

  constructor(private coreService: CoreService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.form = this.formBuilder.group({
      payment: new FormControl(null, [Validators.required, Validators.pattern(this.numberRegex)]),
      cardNumber: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(this.numberRegex)]),
      date: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(this.numberRegex)]),
    })
  }

  checkCreditCard(cardNumber: string) {
    const  visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const  masterCard = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
    const  americanExpress = /^3[47][0-9]{13}$/;
    const  dinersClub = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
    const  jcb = /^(?:2131|1800|35\d{3})\d{11}$/;

    if (visa.test(cardNumber)) {
      this.visa = true;
      this.masterCard = false;
      this.americanExpress = false;
      this.dinersClub = false;
      this.jcb = false;
      return
    } else if (masterCard.test(cardNumber)) {
      this.masterCard = true;
      this.visa = false;
      this.americanExpress = false;
      this.dinersClub = false;
      this.jcb = false;
      return;
    } else if (americanExpress.test(cardNumber)) {
      this.masterCard = false;
      this.visa = false;
      this.americanExpress = true;
      this.dinersClub = false;
      this.jcb = false;
      return;
    } else if (dinersClub.test(cardNumber)) {
      this.masterCard = false;
      this.visa = false;
      this.americanExpress = false;
      this.dinersClub = true;
      this.jcb = false;
      return;
    } else if (jcb.test(cardNumber)) {
      this.masterCard = false;
      this.visa = false;
      this.americanExpress = false;
      this.dinersClub = false;
      this.jcb = true;
      return;
    } else  {
      this.form.controls['cardNumber'].setErrors({'incorrect': true});
      this.masterCard = false;
      this.visa = false;
      this.americanExpress = false;
      this.dinersClub = false;
      this.jcb = false;
    }
  }

  chooseMenu() {
    this.initForm();
    this.menuItem = !this.menuItem
  }
}

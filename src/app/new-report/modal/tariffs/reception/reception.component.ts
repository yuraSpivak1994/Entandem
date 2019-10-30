import { Component, OnInit } from '@angular/core';
import {
  CalculateRoomTariff,
  Count100,
  Count300,
  Count500,
  CountOver500, TableCalculate,
  TariffTax, TotalCard,
  UnitTariff
} from "../../../../shared/interfaces/user";
import { NewReportService } from "../../../new-report.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  tariffTax: Array<TariffTax>;
  checked = false;
  checked300 = false;
  checked500 = false;
  checkedOver500 = false;
  count100: Count100;
  count300: Count300;
  count500: Count500;
  countOver500: CountOver500;
  unitDetail: UnitTariff;
  countEnd100 = 0;
  countStart100 = 0;
  countEnd300 = 0;
  countStart300 = 0;
  countEnd500 = 0;
  countStart500 = 0;
  countEndOver500 = 0;
  countStartOver500 = 0;
  liveMusic = false;
  expandCalc = true;
  tariffForm : FormGroup;
  gstTaxCode = false;
  hstTaxCode = false;
  pstTaxCode = false;
  taxCode: string;
  rate: number;
  tableCalculate: TableCalculate;
  socanTableWD: Array<TableCalculate> = [];
  socanTableWOD: Array<TableCalculate> = [];
  resoundTableWD: Array<TableCalculate> = [];
  resoundTableWOD: Array<TableCalculate> = [];
  calculateRoomTariff: CalculateRoomTariff;
  totalCard = {
    socanTotal: 0,
    resoundTotal: 0,
    subtotal: 0,
    rate: 0,
    totalFees: 0

  };

  constructor(private newReportService: NewReportService,
              private fb: FormBuilder) {
    this.count100 = {
      start: 0,
      end: 0,
    };

    this.count300 = {
      start: 0,
      end: 0,
    };

    this.count500 = {
      start: 0,
      end: 0,
    };

    this.countOver500 = {
      start: 0,
      end: 0,
    };
  }

  fetchUnitDetail() {
    this.newReportService.getUnitDetail()
      .subscribe((data) => {
        this.unitDetail = data;
        this.tableCalculate = data.DETAILS.slice(0, 16);
        this.showFiguresTableWOD(this.tableCalculate);
      }, error => {
        console.log(error);
      })
  }

  fetchTax(PROVINCE) {
      this.newReportService.getTax(PROVINCE)
        .subscribe((data) => {
          this.tariffTax = [...data];
          console.log(this.tariffTax);
          this.checkTaxCode(data.pop());
        }, error => {
          console.log(error);
        })
  }

  showFiguresTableWOD(detail) {
    detail.forEach((item) => {
      if(item.COMPANY === 'SOCAN' && item.TYPE_OF_UNIT === 'WOD') {
        this.socanTableWOD.push(item);
      } if(item.COMPANY === 'SOCAN' && item.TYPE_OF_UNIT === 'WDC') {
        this.socanTableWD.push(item);
      } if (item.COMPANY === 'RESOUND' && item.TYPE_OF_UNIT === 'WDC') {
        this.resoundTableWD.push(item);
      } if (item.COMPANY === 'RESOUND' && item.TYPE_OF_UNIT === 'WOD') {
        this.resoundTableWOD.push(item);
      }
    })
  }

  checkTaxCode(tax) {
    if (tax.TAX_CODE == 'GST') { this.gstTaxCode = true; this.taxCode = tax.TAX_CODE}
    if (tax.TAX_CODE == 'PST' || tax.TAX_CODE == 'QST') { this.pstTaxCode = true; this.taxCode = tax.TAX_CODE}
    if (tax.TAX_CODE == 'HST') { this.hstTaxCode = true; this.taxCode = tax.TAX_CODE}
  }


  initTariffForm() {
      this.tariffForm = this.fb.group({
        year: new FormControl(null, [Validators.required]),
        quarter: new FormControl(null, [Validators.required]),
        liveMusic: new FormControl(true),

        room100: new FormControl( false),
        room300: new FormControl(false),
        room500: new FormControl(false),
        roomOver500: new FormControl(false),


        count1: new FormControl(0),
        count2: new FormControl(0),
        count3: new FormControl(0),
        count4: new FormControl(0),
        count5: new FormControl(0),
        count6: new FormControl(0),
        count7: new FormControl(0),
        count8: new FormControl(0),
      }
      );
  }


  updateCount100() {
    let isTrue = this.tariffForm.get('room100').value;
    if(isTrue) {
      this.tariffForm.get('count1').setValue(0);
      this.tariffForm.get('count2').setValue(0);
      this.count100.start = 0;
      this.count100.end = 0;
    }
   this.calcTariff();
  }

  updateCount300() {
    let isTrue = this.tariffForm.get('room300').value;
    if(isTrue) {
      this.tariffForm.get('count3').setValue(0);
      this.tariffForm.get('count4').setValue(0);
      this.count300.start = 0;
      this.count300.end = 0;
    }
    this.calcTariff();
  }

  updateCount500() {
    let isTrue = this.tariffForm.get('room500').value;
    if(isTrue) {
      this.tariffForm.get('count5').setValue(0);
      this.tariffForm.get('count6').setValue(0);
      this.count500.start = 0;
      this.count500.end = 0;
    }
    this.calcTariff();
  }

  updateCountOver500() {
    let isTrue = this.tariffForm.get('roomOver500').value;
    if(isTrue) {
      this.tariffForm.get('count7').setValue(0);
      this.tariffForm.get('count8').setValue(0);
      this.countOver500.start = 0;
      this.countOver500.end = 0;
    }
    this.calcTariff();
  }

  showValue() {
    console.log(this.tariffForm.value);
    this.validPattern()
  }

  addCountEnd100(count: number, objCount: number) {
    objCount = count;
    this.count100.end = objCount;
    this.calcTariff();
  }

  addCountStart100(count: number, objCount: number) {
    objCount = count;
    this.count100.start = objCount;
    this.calcTariff();
  }

  validPattern():void {
   if(this.checked && this.checked300 && this.checked500 && this.checkedOver500) {
     this.tariffForm.setErrors({'incorrect': true});
   }
  }

  addCountEnd300(count: number, objCount: number) {
    objCount = count;
    this.count300.end = objCount;
    this.calcTariff();
  }

  addCountStart300(count: number, objCount: number) {
    objCount = count;
    this.count300.start = objCount;
    this.calcTariff();
  }

  addCountEnd500(count: number, objCount: number) {
    objCount = count;
    this.count500.end = objCount;
    this.calcTariff();
  }

  addCountStart500(count: number, objCount: number) {
    objCount = count;
    this.count500.start = objCount;
    this.calcTariff();
  }

  addCountEndOver500(count: number, objCount: number) {
    objCount = count;
    this.countOver500.end = objCount;
    this.calcTariff();
  }

  addCountStartOver500(count: number, objCount: number) {
    objCount = count;
    this.countOver500.start = objCount;
    this.calcTariff();
  }


  expandCalculate() {
    this.expandCalc = !this.expandCalc
  }

  calcTariff() {
    this.rate = 0;
    this.tariffTax.forEach(rating => this.rate = rating.RATE);
    this.totalCard.socanTotal = parseFloat((this.count100.start * this.socanTableWOD[0].UNIT_CHARGE
      + this.count300.start * this.socanTableWOD[1].UNIT_CHARGE
      + this.count500.start * this.socanTableWOD[2].UNIT_CHARGE
      + this.countOver500.start * this.socanTableWOD[3].UNIT_CHARGE
      + this.count100.end * this.socanTableWD[0].UNIT_CHARGE
      + this.count300.end * this.socanTableWD[1].UNIT_CHARGE
      + this.count500.end * this.socanTableWD[2].UNIT_CHARGE
      + this.countOver500.end * this.socanTableWD[3].UNIT_CHARGE).toFixed(2))
    this.totalCard.subtotal = this.totalCard.socanTotal + this.totalCard.resoundTotal;

    this.calcTariffResound();
  }

  calcTariffResound() {
    if (!this.liveMusic) {
      this.totalCard.resoundTotal = parseFloat((this.count100.start * this.resoundTableWOD[0].UNIT_CHARGE
        + this.count300.start * this.resoundTableWOD[1].UNIT_CHARGE
        + this.count500.start * this.resoundTableWOD[2].UNIT_CHARGE
        + this.countOver500.start * this.resoundTableWOD[3].UNIT_CHARGE
        + this.count100.end * this.resoundTableWD[0].UNIT_CHARGE
        + this.count300.end * this.resoundTableWD[1].UNIT_CHARGE
        + this.count500.end * this.resoundTableWD[2].UNIT_CHARGE
        + this.countOver500.end * this.resoundTableWD[3].UNIT_CHARGE).toFixed(2))
      this.totalCard.subtotal = this.totalCard.socanTotal + this.totalCard.resoundTotal;
      let rateSocan = parseFloat((this.totalCard.socanTotal * this.rate).toFixed(2));
      let rateResound = parseFloat((this.totalCard.resoundTotal * this.rate).toFixed(2))
      this.totalCard.rate = rateSocan + rateResound;
      this.totalCard.totalFees = parseFloat((this.totalCard.subtotal + this.totalCard.rate).toFixed(2));

    } if (this.liveMusic) {
      this.totalCard.resoundTotal = 0;
      this.totalCard.subtotal = this.totalCard.socanTotal + this.totalCard.resoundTotal;
      let rateSocan = parseFloat((this.totalCard.socanTotal * this.rate).toFixed(2));
      let rateResound = parseFloat((this.totalCard.resoundTotal * this.rate).toFixed(2))
      this.totalCard.rate = rateSocan + rateResound;
      this.totalCard.totalFees =parseFloat((this.totalCard.subtotal + this.totalCard.rate).toFixed(2));

    }
  }


  ngOnInit() {
    this.fetchUnitDetail();
    this.initTariffForm();
    this.fetchTax(this.newReportService.getUserProvince().PROVINCE);
  }

  onSubmit() {
      this.calculateRoomTariff.acctTariffId = 19;
      this.calculateRoomTariff.isSave = 1;
      this.calculateRoomTariff.quarter = this.tariffForm.controls.quarter.value;
      this.calculateRoomTariff.reportId = "3099";
      this.calculateRoomTariff.quarter = this.tariffForm.controls.year.value;
  }
}

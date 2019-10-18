import { Component, OnInit } from '@angular/core';
import { Count100, Count300, Count500, CountOver500 } from "../../../../shared/interfaces/user";

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  checked = false;
  checked300 = false;
  checked500 = false;
  checkedOver500 = false;
  count100: Count100;
  count300: Count300;
  count500: Count500;
  countOver500: CountOver500;
  countEnd100 = 0;
  countStart100 = 0;
  countEnd300 = 0;
  countStart300 = 0;
  countEnd500 = 0;
  countStart500 = 0;
  countEndOver500 = 0;
  countStartOver500 = 0;
  expandCalc = true;

  constructor() {
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


  addCountEnd100(count: number, objCount: number) {
    objCount = count;
    this.count100.end = objCount;
  }

  addCountStart100(count: number, objCount: number) {
    objCount = count;
    this.count100.start = objCount;
  }

  addCountEnd300(count: number, objCount: number) {
    objCount = count;
    this.count300.end = objCount;
  }

  addCountStart300(count: number, objCount: number) {
    objCount = count;
    this.count300.start = objCount;
  }

  addCountEnd500(count: number, objCount: number) {
    objCount = count;
    this.count500.end = objCount;
  }

  addCountStart500(count: number, objCount: number) {
    objCount = count;
    this.count500.start = objCount;
  }

  addCountEndOver500(count: number, objCount: number) {
    objCount = count;
    this.countOver500.end = objCount;
  }

  addCountStartOver500(count: number, objCount: number) {
    objCount = count;
    this.countOver500.start = objCount;
  }

  expandCalculate() {
    this.expandCalc = !this.expandCalc
  }




  ngOnInit() {
  }

}

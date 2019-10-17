import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from "../shared/animation";
import { CoreService } from "../core/core.service";
import { Count100, Count300, Count500, CountOver500, UnitTariff, UserInfo } from "../shared/interfaces/user";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddUnit } from "../assign-tariff/assign-tariff.component";
import { AssignTariffService } from "../assign-tariff/assign-tariff.service";

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss'],
  animations: [fadeInAnimation]
})
export class NewReportComponent implements OnInit {

  user: UserInfo;
  createRepModal = false;
  showSpinner = false;
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

  constructor(public coreService: CoreService,
              public dialog: MatDialog) {
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

  fetchUserInfo() {
    this.showSpinner = true;
    this.coreService.getUser()
      .subscribe((data) => {
        this.user = data;
        this.showSpinner = false;
      }, error => {
        console.log(error);
        this.showSpinner = false;
      })
  };

  ngOnInit() {
    this.fetchUserInfo()
  }

  openDialogUnit(): void {
    const dialogRef = this.dialog.open(TariffsDialog, {
      width: '550px',
      data: {name: this.createRepModal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createRepModal = result;
    });
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

}

@Component({
  selector: 'tariff-modal',
  templateUrl: './modal/tariffs-modal.html',
})

export class TariffsDialog implements OnInit {
  units: UnitTariff;
  unitExpand: UnitTariff;
  showSpinner = false;
  selected: number;
  formUnit: FormGroup;


  constructor(
    private assignTariffService: AssignTariffService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TariffsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddUnit) {}

  onSubmit() {
    console.log(this.formUnit.controls.nameUnit.value);
  }

  initUnitForm() {
    this.formUnit = this.formBuilder.group({
      nameUnit: new FormControl(null, [Validators.required])
    });
  }

  getAllUnit() {
    this.showSpinner = true;
    const active = 0;
    this.assignTariffService.getUnit(active)
      .subscribe((data) => {
        this.units = data;
        this.showSpinner = false;
      }, error => {
        console.log(error);
        this.showSpinner = false;
      })
  }

  chooseUnits(tariff) {
    this.selected = tariff;
    this.showSpinner = true;
    this.assignTariffService.getUnitNew(tariff)
      .subscribe((data) => {
        this.unitExpand = data;
        this.showSpinner = false;
        console.log(this.unitExpand)
      }, error => {
        console.log(error);
      })
  }

  ngOnInit(): void {
    this.getAllUnit();
    this.initUnitForm()
  }

}

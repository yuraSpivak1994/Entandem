import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from "../shared/animation";
import { AssignTariffService } from "./assign-tariff.service";
import { CoreService } from "../core/core.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AllTariff, UnitTariff } from "../shared/interfaces/user";

export interface AssignTariff {
  confirm: boolean
}

export interface AddUnit {
  confirm: boolean;
  unitName: string;
}

@Component({
  selector: 'app-assign-tariff',
  templateUrl: './assign-tariff.component.html',
  styleUrls: ['./assign-tariff.component.scss'],
  animations: [fadeInAnimation]
})
export class AssignTariffComponent implements OnInit {

  confirm: boolean;
  tariffs: Array<AllTariff> = [];
  units: Array<UnitTariff> = [];
  dateForm: FormGroup;
  unitExpand: Array<UnitTariff> = [];
  showSpinner = false;
  groupTariff: string;

  constructor(private assignTariffService: AssignTariffService,
              private formBuilder: FormBuilder,
              public coreService: CoreService,
              public dialog: MatDialog) {
  }

  getAllTarrif() {
    this.showSpinner = true;
    this.assignTariffService.getAllTariffs()
      .subscribe((data) => {
        this.tariffs = data;
        this.showSpinner = false;
      }, error => this.showSpinner = false)
  }

  addTariff(tariff, tariffSeq) {
    this.assignTariffService.assignTariff(tariff, tariffSeq)
      .subscribe(data => {
        this.getAllTarrif();
        this.getAllUnit();
      }, (error) => {
        console.log(error);
      })
  }

  getAllUnit() {
    const active = 0;
    this.assignTariffService.getUnit(active)
      .subscribe((data) => {
        this.units = data;
        setTimeout(() => {
          this.checkUnits(this.tariffs, this.units);
        },100)
      }, error => {
        console.log(error);
      })
  }

  expandUnit(tariff) {
    this.showSpinner = true;
    this.assignTariffService.getUnitNew(tariff)
      .subscribe((data) => {
        this.unitExpand = data;
        this.showSpinner = false;
      }, error => {
        this.showSpinner = false;
      })
  }

  checkUnits(allTarrif, units) {
    this.tariffs = [];
    const unitTariff = [];

    units.find(tariff => {
      unitTariff.push(tariff.TRFF_GROUP);
    });
    allTarrif.map((item) => {
      unitTariff.forEach((tariff) => {
        if (item.TRFF_GROUP === tariff) {
          allTarrif.splice(allTarrif.findIndex(e => e.TRFF_GROUP === tariff), 1);
        }
      });
    });
    this.tariffs = [...allTarrif];
  }

  checkRoomName(room) {
    if (room === 'Main') {
      return 'block'
    }else {
      return 'none'
    }
  }

  createUnit(unit, tariffSeq) {

    this.assignTariffService.addUnit(unit, tariffSeq)
      .subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);})
  }

  ngOnInit() {
    this.getAllUnit();
    this.getAllTarrif();
    this.initDateForm();
  }

  initDateForm() {
    this.dateForm = this.formBuilder.group({
      date: new FormControl(null, [Validators.required])
    });
  }

  transformDate() {
    let calendarDate;
    calendarDate = this.dateForm.get('date').value;
    let year = calendarDate.getFullYear().toString();
    let month = ('0' + (calendarDate.getMonth() + 1)).slice(-2);
    let day = ('0' + calendarDate.getDate()).slice(-2);
    return year + '-' + month + '-' + day
  }

  onSubmitAssign() {
    const req = {startDate: ""};
    req.startDate = this.transformDate();
    this.addTariff(req, this.groupTariff);
  }

  openDialogAssign(TRFF_NAME_ENG: string): void {
    this.groupTariff = TRFF_NAME_ENG;
    const dialogRef = this.dialog.open(AssignDialog, {
      width: '450px',
      data: {name: this.confirm}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.confirm = result;
      if(this.confirm) {
        this.onSubmitAssign();
      }else {
        return}
    }, error => {
      console.log(error);
    });
  }

  openDialogUnit(TRFF_GROUP: number): void {
    const dialogRef = this.dialog.open(UnitDialog, {
      width: '450px',
      data: {name: this.confirm}
    });

    dialogRef.afterClosed().subscribe(result => {
      let res = {unitName: ''};
      this.confirm = result;
      res.unitName = result.unitName;
      if(res.unitName) {
        this.createUnit(res, TRFF_GROUP);
        this.getAllUnit();
      }
    });
  }

}

@Component({
  selector: 'assign-tariff',
  templateUrl: './modal/assign-tariff.html',
})
export class AssignDialog {

  constructor(
    public dialogRef: MatDialogRef<AssignDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AssignTariff) {}

}

@Component({
  selector: 'tariff-unit',
  templateUrl: './modal/tariff-unit.html',
})
export class UnitDialog implements OnInit {
  formUnit: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UnitDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddUnit) {}

  initUnitForm() {
    this.formUnit = this.formBuilder.group({
      unitName: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {}

  ngOnInit(): void {
    this.initUnitForm();
  }

}

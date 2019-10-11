import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from "../shared/animation";
import { AssignTariffService } from "./assign-tariff.service";
import { CoreService } from "../core/core.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AllTariff } from "../shared/interfaces/user";

export interface AssignTariff {
  confirm: boolean
}

export interface AssignUnit {
  unit: string
}

@Component({
  selector: 'app-assign-tariff',
  templateUrl: './assign-tariff.component.html',
  styleUrls: ['./assign-tariff.component.scss'],
  animations: [fadeInAnimation]
})
export class AssignTariffComponent implements OnInit {

  confirm: boolean;
  tariffs: AllTariff;
  dateForm: FormGroup;
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
        this.getAllUnit();
        this.showSpinner = false;
      }, error => this.showSpinner = false)
  }

  addTariff(tariff, tariffSeq) {
    this.assignTariffService.assignTariff(tariff, tariffSeq)
      .subscribe(data => {
        this.getAllTarrif()
      }, (error) => {
        console.log(error);
      })
  }

  getAllUnit() {
    const active = 0;
    this.assignTariffService.getUnit(active)
      .subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      })
  }

  ngOnInit() {
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

  openDialogUnit(): void {
    const dialogRef = this.dialog.open(UnitDialog, {
      width: '450px',
      data: {name: this.confirm}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirm = result;
      console.log('The dialog was closed' + this.confirm);
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

  onNoClick(): void {
    this.dialogRef.close();
  }

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
    @Inject(MAT_DIALOG_DATA) public data: AssignUnit) {}

  initUnitForm() {
    this.formUnit = this.formBuilder.group({
      unitName: new FormControl(null, [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

  }

  ngOnInit(): void {
    this.initUnitForm();
  }

}

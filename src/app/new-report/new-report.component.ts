import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from "../shared/animation";
import { CoreService } from "../core/core.service";
import { Count100, Count300, Count500, CountOver500, UnitTariff, UserInfo } from "../shared/interfaces/user";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddUnit } from "../assign-tariff/assign-tariff.component";
import { AssignTariffService } from "../assign-tariff/assign-tariff.service";
import { ReceptionComponent } from "./modal/tariffs/reception/reception.component";
import { CircusesComponent } from "./modal/tariffs/circuses/circuses.component";

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
  dummyComponent;

  constructor(public coreService: CoreService,
              public dialog: MatDialog) {}

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
      this.assignComponent('reception');
    });
  }

  assignComponent(component) {
    if (component === "reception") this.dummyComponent = ReceptionComponent;
    else if (component === "circuses") this.dummyComponent = CircusesComponent;
    // else this.dummyComponent = CatComponent;
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

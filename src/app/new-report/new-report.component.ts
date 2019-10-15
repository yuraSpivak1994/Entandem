import { Component, Inject, OnInit } from '@angular/core';
import { fadeInAnimation } from "../shared/animation";
import { CoreService } from "../core/core.service";
import { UnitTariff, UserInfo } from "../shared/interfaces/user";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddUnit, UnitDialog } from "../assign-tariff/assign-tariff.component";
import { AssignTariffService } from "../assign-tariff/assign-tariff.service";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss'],
  animations: [fadeInAnimation]
})
export class NewReportComponent implements OnInit {

  user: UserInfo;
  confirm: string;

  constructor(public coreService: CoreService,
              public dialog: MatDialog) {
  }

  fetchUserInfo() {
    this.coreService.getUser()
      .subscribe((data) => {
        this.user = data;
      }, error => {
        console.log(error)
      })
  };

  ngOnInit() {
    this.fetchUserInfo()
  }

  openDialogUnit(): void {
    const dialogRef = this.dialog.open(TariffsDialog, {
      width: '550px',
      data: {name: this.confirm}
    });

    dialogRef.afterClosed().subscribe(result => {
      let res = {unitName: ''};
    });
  }

}

@Component({
  selector: 'tariff-modal',
  templateUrl: './modal/tariffs-modal.html',
})

export class TariffsDialog implements OnInit {
  formUnit: FormGroup;
  units: UnitTariff;
  unitExpand: UnitTariff
  selected = 'option2'


  constructor(
    public formBuilder: FormBuilder,
    private assignTariffService: AssignTariffService,
    public dialogRef: MatDialogRef<TariffsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddUnit) {}

  initUnitForm() {
    this.formUnit = this.formBuilder.group({
      unitName: new FormControl(null, [Validators.required])
    });
  }


  onSubmit() {}

  getAllUnit() {
    const active = 0;
    this.assignTariffService.getUnit(active)
      .subscribe((data) => {
        this.initUnitForm();
        this.units = data;
      }, error => {
        console.log(error);
      })
  }

  chooseUnits(tariff) {
    this.assignTariffService.getUnitNew(tariff)
      .subscribe((data) => {
        this.unitExpand = data;
        console.log(this.unitExpand)
      }, error => {
        console.log(error);
      })
  }

  ngOnInit(): void {
    this.initUnitForm();
    this.getAllUnit();
  }

}

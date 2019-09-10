import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from "../../core/core.service";
import { fadeInAnimation } from "../../shared/animation";
import { PeriodicElement } from "../../shared/interfaces/user";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { merge } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";
import { PaymentsService } from "../payments.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  animations: [fadeInAnimation]
})


export class PaymentHistoryComponent implements OnInit {
  toppingList: string[] = ['Show All', 'Successful', 'Unsuccessful'];
  searchValue: string;
  isOpenSearch =  false;
  isOpenConfig = false;
  form: FormGroup;
  displayedColumns: string[] = ['Date', 'Time', 'Pay  #', 'Paid by', 'Type', 'Amount (CAD$)', 'Status', 'menu'];
   ELEMENT_DATA: PeriodicElement[] = [
    {dateTime: '1019', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '2014', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '2016', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '4017', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '5012', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '2017', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '1014', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '2013', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '2015', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
    {dateTime: '2017', time: '10:05 AM', pay: '1.0079', symbol: 'Elizabeth Blackburn', amount: '2,445,7', type: 'ACredit Card', status: 'Confirmed'},
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  sortedData: PeriodicElement[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  endDateValue: any;
  startDateValue: any;


  constructor(public coreService: CoreService,
              private paymentsService: PaymentsService,
              private formBuilder: FormBuilder) {
    this.sortedData = this.ELEMENT_DATA.slice();
  }

  getSortData() {
    const sortArray = {
      currentPage: this.paginator.pageIndex,
      itemsPerPage: this.paginator.pageSize,
      filter: {
        endDate: this.endDateValue,
        name: "вуву",
        startDate: this.startDateValue,
        status: 1
      },
      sort: {}
    };

    console.log(sortArray);
    // this.paymentsService.getPayments(sortArray)
    //   .subscribe((data) => {
    //     console.log(data);
    //   },
    //     error => {
    //       console.log(error);
    //     })
  }

  checkDateStart() {
    let calendarDate;
    calendarDate = this.form.get('startDate').value;
    let year = calendarDate.getFullYear().toString().slice(2);
    let month = ('0' + (calendarDate.getMonth()+1)).slice(-2);
    let day =  ('0' + calendarDate.getDate()).slice(-2);
    let cutDate = year + '-' + month + '-' + day;
    console.log(cutDate);
  }

  checkDateEnd() {
    let calendarDate;
    calendarDate = this.form.get('endDate').value;
    let year = calendarDate.getFullYear().toString().slice(2);
    let month = ('0' + (calendarDate.getMonth()+1)).slice(-2);
    let day =  ('0' + calendarDate.getDate()).slice(-2);
    let cutDate = year + '-' + month + '-' + day;
    console.log(cutDate);
  }

  initForm() {
    this.form = this.formBuilder.group({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      sort: new FormControl(null),
    })
  }

  // ngAfterViewInit() {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //
  //   merge()
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         return this.exampleDatabase!.getRepoIssues(
  //           this.sort.active, this.sort.direction, this.paginator.pageIndex);
  //       })
  //     )
  // }

  sortData(sort: Sort) {
    const data = this.ELEMENT_DATA.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Date': return compare(a.dateTime, b.dateTime, isAsc);
        default: return 0;
      }
    });
    console.log(this.sortedData);
  }

  ngOnInit() {
    this.initForm();
    this.dataSource.paginator = this.paginator;
    this.getSortData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearSearch() {
    this.searchValue = '';
  }

  toggleSearch() {
    this.isOpenSearch = !this.isOpenSearch;
  }

  toggleConfig() {
    this.isOpenConfig = !this.isOpenConfig;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CoreService } from "../../core/core.service";
import { fadeInAnimation } from "../../shared/animation";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { PaymentsService } from "../payments.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
  animations: [fadeInAnimation]
})

export class PaymentHistoryComponent implements OnInit, AfterViewInit {
  toppingList: string[] = ['Show All', 'Successful', 'Unsuccessful'];
  searchValue: string;
  isOpenSearch =  false;
  isOpenConfig = false;
  form: FormGroup;
  displayedColumns: string[] = ['Date', 'Time', 'Pay  #', 'Paid by', 'Type', 'Amount (CAD$)', 'Status', 'menu'];
  exampleDatabase: PaymentsHttpDatabase | null;
  resultsLength = 0;
  data: any = [];
  isLoadingResults = true;
  isRateLimitReached = false;
  minDate = new Date();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public coreService: CoreService,
              private paymentsService: PaymentsService,
              private formBuilder: FormBuilder,
              private _httpClient: HttpClient) {
  }

  getSortData() {
    const sortArray = {
      currentPage: this.paginator.pageIndex + 1,
      itemsPerPage: this.paginator.pageSize,
      filter: {
        endDate: this.checkDateEnd(),
        startDate: this.checkDateStart(),
        status: this.checkSortCheckbox()
      },
      sort: {}
    };
    console.log(sortArray);
    return sortArray
  }


  checkDateStart() {
    let calendarDate = this.form.get('startDate').value;
    if (calendarDate) {
      let year = calendarDate.getFullYear().toString();
      let month = ('0' + (calendarDate.getMonth()+1)).slice(-2);
      let day =  ('0' + calendarDate.getDate()).slice(-2);
      let cutDate = year + '-' + month + '-' + day;
      return cutDate
    }else  {
      return '2000-01-01'
    }
  }

  checkDateEnd() {
    let calendarDate  = this.form.get('endDate').value;
    if (calendarDate) {
      let year = calendarDate.getFullYear().toString();
      let month = ('0' + (calendarDate.getMonth()+1)).slice(-2);
      let day =  ('0' + calendarDate.getDate()).slice(-2);
      let cutDate = year + '-' + month + '-' + day;
      return cutDate
    } else  {
      return '3000-01-01'
    }
  }

  checkStatus(number) {
    if (number === 1) {
      return 'Confirmed'
    } else if (number === 0) {
      return 'Failed'
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      sort: new FormControl(null),
    });
  }

  getQuestion() {
    this.exampleDatabase = new PaymentsHttpDatabase(this._httpClient);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.getSortData());
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.payments;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => {
      console.log(this.data = data);
    });
  }
  ngAfterViewInit() {
    this.getQuestion();
  }

  checkSortCheckbox() {
    let sort = 0;
    this.form.get('sort').valueChanges.subscribe(
      value => {
        if (value === 'Show All') {
          return sort = 0
        } else if (value === 'Successful') {
         return  sort = 1
        } else if (value === 'Unsuccessful') {
         return sort = 0
        }
      }
    );
    return sort

  }

  ngOnInit() {
    this.initForm();
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

export class PaymentsHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sortArray): Observable<any> {
    const requestUrl =
      `${environment.apiUrl}/profile/payments`;

    return this._httpClient.post<any>(requestUrl, sortArray);
  }
}




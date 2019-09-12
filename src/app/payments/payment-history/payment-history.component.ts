import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CoreService } from "../../core/core.service";
import { fadeInAnimation } from "../../shared/animation";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf, Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
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
  isOpenSearch = false;
  isOpenConfig = false;
  form: FormGroup;
  displayedColumns: string[] = ['Date', 'Time', 'Pay  #', 'Paid by', 'Type', 'Amount (CAD$)', 'Status', 'menu'];
  exampleDatabase: PaymentsHttpDatabase | null;
  resultsLength = 0;
  data: any = [];
  isLoadingResults = true;
  isRateLimitReached = false;
  sortCheckbox = '';
  startDateSort: string;
  endDateSort: string;
  endDateCloseIcon = false;
  startDateCloseIcon = false;
  newData: any = [];
  searchName = '';
  model: string;
  modelChanged: Subject<string> = new Subject<string>();


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public coreService: CoreService,
              private paymentsService: PaymentsService,
              private formBuilder: FormBuilder,
              private _httpClient: HttpClient) {

    this.modelChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((model) => {
        this.model = model;
        this.searchName = model
        this.getQuestion();
      });
  }

  changed(text: string) {
    this.modelChanged.next(text);
  }

  getSortData() {
    const sortArray = {
      currentPage: this.paginator.pageIndex + 1,
      itemsPerPage: this.paginator.pageSize,
      name: this.searchName,
      filter: {
        endDate: this.endDateSort,
        startDate: this.startDateSort,
        status: this.sortCheckbox
      },
      sort: {}
    };
    console.log(sortArray);
    return sortArray
  }

  private get statusMap(): any {
    return {
      [1]: {
        color: '#00B274',
        text: 'Confirmed'
      },
      [0]: {
        color: '#B00020',
        text: 'Failed'
      }
    };
  }

  private transformStatus(numbers) {
    return numbers.map((item: any) => ({...item, status: this.statusMap[item.PAYMENT_STATUS]}));
  }

  showCloseIconFieldStart(value) {
    this.startDateCloseIcon = !!value;
  }

  showCloseIconFieldEnd(value) {
    this.endDateCloseIcon = !!value;
  }

  clearValueFieldEnd() {
    this.form.get('endDate').setValue('')
  }

  clearValueFieldStart() {
    this.form.get('startDate').setValue('')
  }

  checkDateStart() {
    this.form.get('startDate').valueChanges.subscribe((value) => {
      let calendarDate = value;
      if (calendarDate) {
        let year = calendarDate.getFullYear().toString();
        let month = ('0' + (calendarDate.getMonth() + 1)).slice(-2);
        let day = ('0' + calendarDate.getDate()).slice(-2);
        this.startDateSort = year + '-' + month + '-' + day;
        this.getQuestion();
      } else {
        this.startDateSort = '2000-01-01';
        this.getQuestion();
      }
      this.showCloseIconFieldStart(value);
    });
  }

  checkDateEnd() {
    this.form.get('endDate').valueChanges.subscribe((value) => {
      let calendarDate = value;
      if (calendarDate) {
        let year = calendarDate.getFullYear().toString();
        let month = ('0' + (calendarDate.getMonth() + 1)).slice(-2);
        let day = ('0' + calendarDate.getDate()).slice(-2);
        this.endDateSort = year + '-' + month + '-' + day;
        this.getQuestion();
      } else {
        this.endDateSort = '3000-01-01';
        this.getQuestion();
      }
      this.showCloseIconFieldEnd(value);
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      sort: new FormControl(null),
      search:  new FormControl(null)
    });
    this.checkSortCheckboxes();
    this.checkDateStart();
    this.checkDateEnd();
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
          this.resultsLength = data.total;
          return data.payments;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe((data) => {
      this.data = data;
      this.transformStatus(this.data);
      this.newData = this.transformStatus(this.data);
    });
  }

  checkSortCheckboxes() {
    this.form.get('sort').valueChanges.subscribe(
      value => {
        if (value == "Show All") {
          this.sortCheckbox = '';
          this.getQuestion();
        } else if (value == 'Successful') {
          this.sortCheckbox = '1';
          this.getQuestion();
        } else if (value == 'Unsuccessful') {
          this.sortCheckbox = '0';
          this.getQuestion();
        }
      }
    );
  }

  ngAfterViewInit() {
    this.getQuestion();
  }

  ngOnInit() {
    this.initForm();
  }


  clearSearch() {
    this.model = '';
  }

  toggleSearch() {
    this.isOpenSearch = !this.isOpenSearch;
  }

  toggleConfig() {
    this.isOpenConfig = !this.isOpenConfig;
  }
}

export class PaymentsHttpDatabase {
  constructor(private _httpClient: HttpClient) {
  }

  getRepoIssues(sortArray): Observable<any> {
    const requestUrl =
      `${environment.apiUrl}/profile/payments`;

    return this._httpClient.post<any>(requestUrl, sortArray);
  }
}




import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Customer } from '../../models/customer.model';

import { MatDialog } from '@angular/material/dialog';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { LoadingService } from '../../services/loading.service';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCustomers } from '../../store/selectors/customer.selectors';
import { AppState } from '../../store/reducers/index';
import { loadCustomers } from '../../store/actions/customer.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('paginatorTop') paginatorTop!: MatPaginator;
  @ViewChild('paginatorBottom') paginatorBottom!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  private topPaginatorSubscription!: Subscription;
  private bottomPaginatorSubscription!: Subscription;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'status',
  ];

  dataSource!: MatTableDataSource<Customer>;

  public customers$: Observable<Customer[]> | undefined;

  constructor(
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.setPaginationChanges();
    setTimeout(() => { // Small fix for the expressionChanged error, so Angular finish the render and then change the Data
      this.setCustomerData();
    });
  }

  setPaginationChanges() {
    this.topPaginatorSubscription = this.paginatorTop.page.subscribe(() => {
      this.paginatorBottom.pageIndex = this.paginatorTop.pageIndex;
      this.paginatorBottom.pageSize = this.paginatorTop.pageSize;
      this.paginatorBottom.length = this.paginatorTop.length;
      this.dataSource.paginator = this.paginatorTop;
    });

    this.bottomPaginatorSubscription = this.paginatorBottom.page.subscribe(() => {
      this.paginatorTop.pageIndex = this.paginatorBottom.pageIndex;
      this.paginatorTop.pageSize = this.paginatorBottom.pageSize;
      this.paginatorTop.length = this.paginatorBottom.length;
      this.dataSource.paginator = this.paginatorBottom;
    });
  }

  setCustomerData(): void {
    this.loadingService.setToLoad(true);

    this.store.dispatch(loadCustomers());
    this.customers$ = this.store
      .select(selectCustomers)
      .pipe(
        map(
          (customers) => customers.filter((c) => c !== undefined) as Customer[]
        )
      );

    this.customers$.subscribe((customers) => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.sort = this.sort;


      this.paginatorTop.length = customers.length;
      this.paginatorBottom.length = this.paginatorTop.length;

      this.dataSource.paginator = this.paginatorTop;

      // Define the filter function to use only the lastName attribute
      this.dataSource.filterPredicate = (data: Customer, filter: string) => {
        return data.lastName.toLowerCase().includes(filter);
      };

      this.loadingService.setToLoad(false, 1000); // Added a fake time loading to simulate http request
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.dataSource);
  }

  onPageChange( event: PageEvent ) {
    setTimeout(() =>
    window.scrollTo({ top: 0, behavior: 'smooth' }), 0);

    console.log(event)
  }

  onClikedCustomer(rowSelected: MatRow){
    console.log(rowSelected);

  }

  dialogCustomerCreate(): void {}

  dialogCustomerEdit(customer: Customer): void {}


  ngOnDestroy(): void {
    this.topPaginatorSubscription.unsubscribe();
    this.bottomPaginatorSubscription.unsubscribe();
  }
}

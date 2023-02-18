import { Component, ViewChild, OnInit } from '@angular/core';

import { Customer } from '../../models/customer.model';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { LoadingService } from '../../services/loading.service';

import { Observable } from 'rxjs';
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
export class CustomerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displatedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'status',
    'actions',
  ];

  dataSource! : MatTableDataSource<Customer>;

  public customers$: Observable<Customer[]> | undefined;

  constructor(
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {

    this.setCustomerDataByService();

  }

  setCustomerDataByService(): void {

    this.loadingService.setToLoad(true);

    this.store.dispatch(loadCustomers());
    this.customers$ = this.store.select(selectCustomers).pipe(
      map((customers) => customers.filter((c) => c !== undefined) as Customer[])
    );

    this.customers$.subscribe((customers) => {
      this.dataSource = new MatTableDataSource(customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Define the filter function to use only the lastName attribute
      this.dataSource.filterPredicate = (data: Customer, filter: string) => {
        return data.lastName.toLowerCase().includes(filter);
      };


      this.loadingService.setToLoad(false, 1000); // Added a fake time loading to simulate http request
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.dataSource);
  }

  OnDialogCustomerCreate(): void {}

  OnDialogCustomerEdit(customer: Customer): void {}
}

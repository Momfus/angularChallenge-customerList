import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { Customer } from '../../models/customer.model';

import { CustomersService } from '../../services/customers.service';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements AfterViewInit {
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

  dataSource!: MatTableDataSource<Customer>;


  constructor(
    private customersService: CustomersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setCustomerDataByService();

    // Define the filter function to use only the lastName attribute
    this.dataSource.filterPredicate = (data: Customer, filter: string) => {
      return data.lastName.toLowerCase().includes(filter);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setCustomerDataByService(): void {
    this.customersService.getCustomers().subscribe((customers) => {
      this.dataSource = new MatTableDataSource(customers);
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if( this.dataSource.paginator ) {
      this.dataSource.paginator.firstPage();
    }

    console.log(this.dataSource);


  }

  OnDialogCustomerCreate(): void {}

  OnDialogCustomerEdit(customer: Customer): void {}
}

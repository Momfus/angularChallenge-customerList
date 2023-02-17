import { Component } from '@angular/core';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  constructor(
    private customersService: CustomersService
  ) {}

}

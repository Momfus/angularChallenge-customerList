import { Component } from '@angular/core';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  constructor(
    private customersService: CustomersService
  ) {}

}

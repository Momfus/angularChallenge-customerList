import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { statusType, Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  form!: FormGroup;
  statusOptions: { value: statusType; viewValue: string }[] = [
    {value: 'active',    viewValue: 'Active'},
    {value: 'pending',   viewValue: 'Pending'},
    {value: 'inactive',  viewValue: 'Inactive'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CustomerFormComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  close() {
    this.dialogRef.close();
  }

  createCustomer() {

    if (this.form.valid) {

      const customer: Customer = {
        id: '',
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        status: this.form.value.status,
        email: this.form.value.email,
        phone: this.form.value.phone,
      };

      this.dialogRef.close(customer);

    }
  }
}

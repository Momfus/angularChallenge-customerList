import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { statusType, Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent {
  title: string = '';
  type: string = 'new';
  confirmButtonText: string = 'Create';
  form!: FormGroup;
  statusOptions: { value: statusType; viewValue: string }[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'inactive', viewValue: 'Inactive' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: Customer | null
  ) {}

  ngOnInit(): void {
    if (this.customer) {
      this.form = this.formBuilder.group({
        firstName: [this.customer.firstName, Validators.required],
        lastName: [this.customer.lastName, Validators.required],
        status: [this.customer.status, Validators.required],
        email: [this.customer.email, [Validators.required, Validators.email]],
        // Note: I know there are better ways to validate a correct phone number with a API wich gave me all the countary code numbers and limitation, is not the propurse of this challenge
        phone: [
          this.customer.phone,
          [
            Validators.pattern(
              /^\+?\d{1,3}\s?\-?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
            ),
          ],
        ],
      });

      this.title = 'Edit Customer';
      this.type = 'edit';
      this.confirmButtonText = 'Edit';
    } else {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        status: ['active', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        // Note: I know there are better ways to validate a correct phone number with a API wich gave me all the countary code numbers and limitation, is not the propurse of this challenge
        phone: [
          '',
          [
            Validators.pattern(
              /^\+?\d{1,3}\s?\-?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
            ),
          ],
        ],
      });

      this.title = 'Add Customer';
    }
  }

  close() {
    this.dialogRef.close();
  }

  createEditCustomer() {
    if (this.form.valid) {
      const customer: Customer = {
        id: (this.customer && this.customer.id) || '',
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        status: this.form.value.status,
        email: this.form.value.email,
        phone: this.form.value.phone,
      };

      this.dialogRef.close({ customer, type: this.type });
    }
  }

  onDeleteCustomer() {
    this.type = 'delete';

    this.dialogRef.close({ customer: this.customer, type: this.type });
  }
}

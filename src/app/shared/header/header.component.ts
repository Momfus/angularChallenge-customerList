import { Component,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { Customer } from '../../models/customer.model';
import { AppState } from '../../store/reducers/index';
import { Store } from '@ngrx/store';
import { addCustomer } from '../../store/actions/customer.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  @Input() title: string = '';

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}

  onDialogFormModal() {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { customer: Customer; type: string }) => {
        if (result && result.customer) {
          this.dialogCustomerCreate(result.customer);
        }
      });
  }

  dialogCustomerCreate(customer: Customer): void {
    this.store.dispatch(addCustomer({ customer }));
    this.snackBar.open(
      `Customer "${customer.firstName} ${customer.lastName}" created`,
      'Close',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }
}

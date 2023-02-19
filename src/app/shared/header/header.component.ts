import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { Customer } from '../../models/customer.model';
import { AppState } from '../../store/reducers/index';
import { Store } from '@ngrx/store';
import { addCustomer } from '../../store/actions/customer.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ){}

  onDialogFormModal() {

    const dialogRef = this.dialog.open( CustomerFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Customer) => {

      if( result ) {
        this.dialogCustomerCreate(result)
      }

    });


  }


  dialogCustomerCreate(customer: Customer): void {

    this.store.dispatch(addCustomer({customer}));

  }

}

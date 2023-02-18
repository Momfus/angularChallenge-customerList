import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as CustomerActions from '../actions/customer.actions';
import { CustomersService } from '../../services/customers.service';

@Injectable()
export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private customersService: CustomersService
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(() =>
        this.customersService.getCustomers().pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
        )
      )
    )
  );

  addCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomerActions.addCustomer),
        map((action) => this.customersService.createCustomer(action.customer))
      ),
    { dispatch: false }
  );



  updateCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomerActions.updateCustomer),
        map((action) => this.customersService.updateCustomer(action.customer))
      ),
    { dispatch: false }
  );


  deleteCustomer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomerActions.deleteCustomer),
        map((action) => this.customersService.deleteCustomer(action.customerId))
      ),
    { dispatch: false }
  );

}

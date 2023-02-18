import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as CustomerActions from '../actions/customer.actions';
import { Customer } from '../../models/customer.model';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: string | null;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
  selectId: (customer: Customer) => customer.id,
  sortComparer: false,
});

export const initialCustomerState: CustomerState = adapter.getInitialState({
  selectedCustomerId: null,
});

export const customerReducer = createReducer(
  initialCustomerState,

  on(CustomerActions.loadCustomersSuccess, (state, { customers }) =>
    adapter.setAll(customers, state)
  ),
  on(CustomerActions.addCustomerSuccess, (state, { customer }) =>
    adapter.addOne(customer, state)
  ),
  on(CustomerActions.updateCustomerSuccess, (state, { customer }) =>
    adapter.updateOne({ id: customer.id, changes: customer }, state)
  ),
  on(CustomerActions.deleteCustomerSuccess, (state, { customerId }) =>
    adapter.removeOne(customerId, state)
  )
);


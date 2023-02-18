import { createReducer, on, createSelector, createFeatureSelector, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


import * as CustomerActions from '../actions/customer.actions';
import { Customer } from '../../models/customer.model';

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialCustomerState: CustomerState = adapter.getInitialState({
  selectedCustomerId: null
});

export const {
  selectAll: selectAllCustomers,
  selectEntities: selectCustomerEntities,
  selectIds: selectCustomerIds,
  selectTotal: selectTotalCustomers,
} = adapter.getSelectors();

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectSelectedCustomerId = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.selectedCustomerId
);

export const selectSelectedCustomer = createSelector(
  selectCustomerEntities,
  selectSelectedCustomerId,
  (customerEntities, customerId) => customerId ? customerEntities[customerId] : null
);

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
  ),

);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}

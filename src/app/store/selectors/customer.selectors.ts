import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import { AppState } from '../reducers/index';

export const selectCustomerState = createFeatureSelector<AppState, Customer[]>(
  'customers'
);

export const selectAllCustomers = createSelector(
  selectCustomerState,
  (state: Customer[]) => state
);

export const selectCustomerById = (customerId: string) =>
  createSelector(selectCustomerState, (state: Customer[]) =>
    state.find((customer) => customer.id === customerId)
  );

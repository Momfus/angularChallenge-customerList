import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { CustomerState } from '../reducers/customer.reducer';

const selectCustomerState: MemoizedSelector<object, CustomerState> = createFeatureSelector<CustomerState>('customers');

export const selectCustomers = createSelector(selectCustomerState, (state: CustomerState) => Object.values(state.entities));
